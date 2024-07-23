import { useDispatch } from "react-redux";
import { openModal } from "@/redux/slices/modal";

import pictureImg from "@/assets/images/leftside/picture.png";
import laughImg from "@/assets/images/middleSide/laugh.png";

import { getUserInfo } from "@/utils/auth";

import styles from "./index.module.scss";

function YourThink() {
  const dispatch = useDispatch();
  const userInfo = getUserInfo();
  const { id, name, image_profile } = userInfo;

  const YOUR_THINK_ITEMS = [
    {
      name: "Photo/video",
      imgURL: pictureImg,
    },
    {
      name: "Photo/video",
      imgURL: pictureImg,
    },
    {
      name: "Feel/activity",
      imgURL: laughImg,
    },
  ];

  return (
    <div className={styles.yourThink}>
      <div className={styles.yourThinkHeader}>
        <div className={styles.yourThinkImage}>
          <img src={userInfo.image_profile} alt="" />
        </div>
        <div
          className={styles.yourThinkText}
          onClick={() => dispatch(openModal())}
        >
          <span>How do you feel?</span>
        </div>
      </div>
      <ul className={styles.yourThinkFooter}>
        {YOUR_THINK_ITEMS?.map((item, index) => (
          <li
            className={styles.yourThinkFooterAction}
            key={index}
            onClick={() => dispatch(openModal())}
          >
            <div className={styles.yourThinkFooterImage}>
              <img src={item.imgURL} alt="" />
            </div>
            <span className={styles.yourThinkFooterText}>{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default YourThink;
