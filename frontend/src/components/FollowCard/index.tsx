import { useState } from "react";
import { useDispatch } from "react-redux";

import { FaPlus } from "react-icons/fa6";
import { RiUserFollowLine } from "react-icons/ri";

import Button from "@/components/Button";
import { IFollowUserFE } from "@/utils/follow";
import { getUserInfo } from "@/utils/auth";
import { useLazyFollowUserQuery } from "@/services/FollowAPI";
import { hideLoading, showLoading } from "@/redux/slices/loading";

import styles from "./index.module.scss";

enum EFollowActionType {
  FOLLOW,
  UNFOLLOW,
}

function FollowCard({ user }: { user: IFollowUserFE }) {
  const [followUser] = useLazyFollowUserQuery();
  const [unfollowUser] = useLazyFollowUserQuery();
  const [isFollowed, setIsFollowed] = useState(false);
  const dispatch = useDispatch();
  const userInfo = getUserInfo();

  const onFollowAction = async (userId: number, type: EFollowActionType) => {
    dispatch(showLoading());
    switch (type) {
      case EFollowActionType.FOLLOW:
        await followUser({ user_id: userId, follower_id: userInfo.id }).then(
          () => setIsFollowed(true)
        );

        break;
      case EFollowActionType.UNFOLLOW:
        await unfollowUser({ user_id: userId, follower_id: userInfo.id }).then(
          () => setIsFollowed(false)
        );
        break;
    }
    dispatch(hideLoading());
  };

  return (
    <div className={styles.followCard}>
      <div className={styles.followCardImg}>
        <img src={user.imageUrl} alt="" />
      </div>
      <div className={styles.followCardInfo}>
        <p className={styles.followCardName}>{user.name}</p>
        <p className={styles.followCardAddress}>{user.address}</p>
      </div>
      {isFollowed ? (
        <Button
          btnType="secondary"
          isRounded
          isFullWidth
          mt12={true}
          onClick={() => onFollowAction(user.id, EFollowActionType.UNFOLLOW)}
        >
          <RiUserFollowLine /> Unfollow
        </Button>
      ) : (
        <Button
          btnType="secondary"
          isRounded
          isFullWidth
          mt12={true}
          htmlType="submit"
          onClick={() => onFollowAction(user.id, EFollowActionType.FOLLOW)}
        >
          <FaPlus /> Follow
        </Button>
      )}
    </div>
  );
}

export default FollowCard;
