import { useNavigate } from "react-router-dom";
import styles from "./index.module.scss";

interface IUserProfilePropsType {
  image: any;
  isRounded?: boolean;
  userDisplayName: string;
  isActive?: boolean;
  bgGray?: boolean;
  canNegative?: boolean;
  borderBottom?: boolean;
  idUser?: number;
}

function UserProfile({
  isRounded = false,
  image,
  userDisplayName,
  isActive,
  bgGray,
  canNegative,
  borderBottom,
  idUser,
}: IUserProfilePropsType) {
  const navigate = useNavigate();
  return (
    <div
      className={`
      ${styles.userProfile} 
      ${bgGray ? styles.bgGray : ""}  
      ${borderBottom ? styles.borderBottom : ""}
      `}
      onClick={() => {
        if (canNegative) navigate(`/profile?id=${idUser}`);
      }}
    >
      <div className={`${isActive ? styles.active : ""}`}>
        <div
          className={`
        ${styles.userProfileImage} 
        ${isRounded ? styles.rounded : ""} 
        ${isActive ? styles.active : ""}
        `}
        >
          <img src={image} alt="" />
        </div>
      </div>
      <span className={styles.userName}>{userDisplayName}</span>
    </div>
  );
}

export default UserProfile;
