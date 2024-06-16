import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

interface IUserProfilePropsType {
  image: any;
  isRounded?: boolean;
  userDisplayName: string;
  isActive?: boolean;
  bgGray?: boolean;
}

function UserProfile({
  isRounded = false,
  image,
  userDisplayName,
  isActive,
  bgGray,
}: IUserProfilePropsType) {
  const navigate = useNavigate();
  return (
    <div className={`${styles.userProfile} ${bgGray ? styles.bgGray : ""}`}>
      <div
        className={`
        ${styles.userProfileImage} 
        ${isRounded ? styles.rounded : ""} 
        ${isActive ? styles.active : ""}
        
        `}
      >
        <img src={image} alt="" />
      </div>
      <span className={styles.userName}>{userDisplayName}</span>
    </div>
  );
}

export default UserProfile;
