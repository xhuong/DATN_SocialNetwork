import styles from "./index.module.scss";

function YourThink() {
  return (
    <div className={styles.yourThink}>
      <div className={styles.yourThinkHeader}>
        <div className={styles.yourThinkImage}>
          <img src={require("../../assets/images/users/girl.jpg")} alt="" />
        </div>
        <div className={styles.yourThinkText}>
          <span>Ấy ơi, bạn đang nghĩ gì thế?</span>
        </div>
      </div>
      <ul className={styles.yourThinkFooter}>
        <li className={styles.yourThinkFooterAction}>
          <div className={styles.yourThinkFooterImage}>
            <img
              src={require("../../assets/images/leftside/picture.png")}
              alt=""
            />
          </div>
          <span className={styles.yourThinkFooterText}>Ảnh/video</span>
        </li>
        <li className={styles.yourThinkFooterAction}>
          <div className={styles.yourThinkFooterImage}>
            <img
              src={require("../../assets/images/leftside/picture.png")}
              alt=""
            />
          </div>
          <span className={styles.yourThinkFooterText}>Ảnh/video</span>
        </li>
        <li className={styles.yourThinkFooterAction}>
          <div className={styles.yourThinkFooterImage}>
            <img
              src={require("../../assets/images/middleSide/laugh.png")}
              alt=""
            />
          </div>
          <span className={styles.yourThinkFooterText}>Cảm xúc/hoạt động</span>
        </li>
      </ul>
    </div>
  );
}

export default YourThink;
