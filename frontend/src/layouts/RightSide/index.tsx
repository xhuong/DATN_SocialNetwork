import UserProfile from "@/components/UserProfile";

import { BsThreeDots } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";

import girl from "@/assets/images/users/girl.jpg";
import defaultProfileImage from "@/assets/images/users/default.png";

import { IUserInfoBE } from "@/services/AuthenticationAPI";

import { getUserInfo } from "@/utils/auth";

import styles from "./index.module.scss";

function RightSide() {
  const userInfo: IUserInfoBE = getUserInfo();

  return (
    <div className={styles.rightSide}>
      <UserProfile
        userDisplayName={userInfo.name}
        image={defaultProfileImage}
        isRounded
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
        <li>
          <UserProfile
            userDisplayName={userInfo.name}
            isRounded
            image={girl}
            isActive
          />
        </li>
      </ul>
    </div>
  );
}

export default RightSide;
