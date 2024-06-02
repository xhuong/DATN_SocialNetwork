import UserProfile from "@/components/UserProfile";

import { BsThreeDots } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";

import defaultProfileImage from "@/assets/images/users/default.png";
import girl from "@/assets/images/users/girl.jpg";

import styles from "./index.module.scss";

function RightSide() {
  return (
    <div className={styles.rightSide}>
      <UserProfile
        userDisplayName="Xuân Hướng"
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
            userDisplayName="Phan Lan Anh"
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
