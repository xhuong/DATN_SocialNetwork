import { AiOutlineExclamation } from "react-icons/ai";

import styles from "./index.module.scss";

interface IUserProps {
  avatarUrl: string;
  userDisplayName: string;
  hasNewMessage: boolean;
  isSelected?: boolean;
  onSelect: () => void;
}

function User({
  avatarUrl,
  userDisplayName,
  hasNewMessage = false,
  isSelected = false,
  onSelect,
}: IUserProps) {
  return (
    <div
      onClick={onSelect}
      className={`${styles.user} ${isSelected ? styles.selected : ""}`}
    >
      <div className={styles.userAvatar}>
        <img
          src={require("../../../../assets/images/users/default.png")}
          alt=""
        />
      </div>
      <p className={styles.userDisplayName}>{userDisplayName} </p>
      {hasNewMessage && (
        <span className={styles.newMessageIcon}>
          <AiOutlineExclamation />
        </span>
      )}
    </div>
  );
}

export default User;
