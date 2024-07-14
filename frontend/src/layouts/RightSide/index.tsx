import { useEffect, useState } from "react";

import UserProfile from "@/components/UserProfile";

import { BsThreeDots } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";

import defaultProfileImage from "@/assets/images/users/default.png";

import { getUserInfo } from "@/utils/auth";
import { IUserBE } from "@/utils/common";

import { useLazyGetFollowerUsersQuery } from "@/services/FollowAPI";

import {
  IFollowUserFEOmitAddress,
  mapUserFollowBEToUserFollowFEWithouAddress,
} from "@/utils/follow";
import styles from "./index.module.scss";

function RightSide() {
  const userInfo: IUserBE = getUserInfo();
  const [getFollowerUsers, { data, isSuccess }] =
    useLazyGetFollowerUsersQuery();
  const [followers, setFollowers] = useState<IFollowUserFEOmitAddress[]>([]);

  useEffect(() => {
    if (userInfo.id) {
      getFollowerUsers({ id: userInfo.id });
    }
  }, []);

  useEffect(() => {
    if (data && isSuccess) {
      const convertedData = mapUserFollowBEToUserFollowFEWithouAddress(
        data.result.data
      );
      setFollowers(convertedData);
    }
  }, [data]);

  const openChat = () => {};

  return (
    <div className={styles.rightSide}>
      <UserProfile
        userDisplayName={userInfo.name}
        image={defaultProfileImage}
        isRounded
        canNegative
        idUser={userInfo.id}
      />
      <div className={styles.contactUser}>
        <span>Người liên hệ</span>
        <span className={styles.contactUserAction}>
          <span className={styles.searchUserIcon}>
            <IoSearchOutline />
          </span>
          <span className={styles.contactUserSetting}>
            <BsThreeDots />
          </span>
        </span>
      </div>
      <ul>
        {followers.map((user, index) => (
          <li onClick={openChat} key={index}>
            <UserProfile
              userDisplayName={user.name}
              isRounded
              image={user.imageUrl}
              isActive
              canNegative
              idUser={user.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RightSide;
