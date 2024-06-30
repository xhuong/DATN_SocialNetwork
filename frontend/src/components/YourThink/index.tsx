import { useDispatch } from "react-redux";
import { openModal } from "@/redux/slices/modal";

import pictureImg from "@/assets/images/leftside/picture.png";
import laughImg from "@/assets/images/middleSide/laugh.png";

import styles from "./index.module.scss";
import { getUserInfo } from "@/utils/auth";

function YourThink() {
  const dispatch = useDispatch();
  const userInfo = getUserInfo();
  const { id, name, image_profile } = userInfo;

  const YOUR_THINK_ITEMS = [
    {
      name: "Ảnh/video",
      imgURL: pictureImg,
    },
    {
      name: "Ảnh/video",
      imgURL: pictureImg,
    },
    {
      name: "Cảm xúc/hoạt động",
      imgURL: laughImg,
    },
  ];

  return (
    <div className={styles.yourThink}>
      <div className={styles.yourThinkHeader}>
        <div className={styles.yourThinkImage}>
          <img src={require("../../assets/images/users/default.png")} alt="" />
        </div>
        <div
          className={styles.yourThinkText}
          onClick={() => dispatch(openModal())}
        >
          <span>Ấy ơi, bạn đang nghĩ gì thế?</span>
        </div>
      </div>
      <ul className={styles.yourThinkFooter}>
        {YOUR_THINK_ITEMS?.map((item, index) => (
          <li className={styles.yourThinkFooterAction} key={index}>
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
