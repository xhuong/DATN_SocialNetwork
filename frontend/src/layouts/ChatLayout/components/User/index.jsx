import StatusIcon from "../StatusIcon";

import styles from "./index.module.scss";

const User = ({ user, selected, onSelect }) => (
  <div
    className={`${styles.user}  ${selected ? styles.selected : ""}`}
    onClick={onSelect}
  >
    <div className="description">
      <div className="name">
        {user.username} {user.self ? " (you)" : ""}
      </div>
      <div className="status">
        <StatusIcon connected={user.connected} />
        {user.connected ? "online" : "offline"}
      </div>
    </div>
    {/* {user.hasNewMessages && <div className={styles.newMessages}>!</div>} */}
  </div>
);

export default User;
