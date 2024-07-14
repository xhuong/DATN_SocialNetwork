import UserProfile from "@/components/UserProfile";
import { RootState } from "@/redux/store";

import friends from "@/assets/images/leftside/friends.png";
import defaultProfileImage from "@/assets/images/users/default.png";
import picture from "@/assets/images/leftside/picture.png";
import video from "@/assets/images/leftside/video.png";
import saved from "@/assets/images/leftside/saved.png";
import userGroup from "@/assets/images/leftside/group_user.png";

import { getUserInfo } from "@/utils/auth";
import { IUserBE } from "@/utils/common";

import styles from "./index.module.scss";

function LeftSide() {
  const userInfo: IUserBE = getUserInfo();

  return (
    <div className={styles.leftSide}>
      <UserProfile
        userDisplayName={userInfo.name}
        image={defaultProfileImage}
        isRounded
        canNegative
        idUser={userInfo.id}
      />
      <ul>
        <li>
          <UserProfile userDisplayName="Bạn bè" image={friends} />
        </li>
        <li>
          <UserProfile userDisplayName="Ảnh" image={picture} />
        </li>
        <li>
          <UserProfile userDisplayName="Nhóm" image={userGroup} />
        </li>
        <li>
          <UserProfile userDisplayName="Đã lưu" image={saved} />
        </li>
        <li>
          <UserProfile userDisplayName="Watch" image={video} />
        </li>
      </ul>
    </div>
  );
}

export default LeftSide;
