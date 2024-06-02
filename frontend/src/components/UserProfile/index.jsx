import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

function UserProfile({
  isRounded = false,
  image,
  redirectURL,
  userDisplayName,
  isActive,
}) {
  const navigate = useNavigate();
  return (
    <div className={styles.userProfile}>
      <div
        className={`
        ${styles.userProfileImage} 
        ${isRounded ? styles.rounded : ""} 
        ${isActive ? styles.active : ""}
        `}
      >
        <img src={image} alt="" />
      </div>
      <span className={styles.userName} onClick={() => navigate(redirectURL)}>
        {userDisplayName}
      </span>
    </div>
  );
}

export default UserProfile;
