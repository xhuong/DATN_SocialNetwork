import { Link } from "react-router-dom";

import { IoHomeOutline } from "react-icons/io5";
import { LuMessageCircle } from "react-icons/lu";
import { MdOndemandVideo, MdGroups } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";

import styles from "./index.module.scss";

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.headerLogo}>
          <img src={require("../../assets/images/logo.png")} alt="" />
        </div>
        <div className={styles.headerSearch}>
          <IoIosSearch />
          <input type="text" placeholder="Tìm kiếm trên facebook" />
        </div>
      </div>
      <div className={styles.headerPage}>
        <ul className={styles.headerPageList}>
          <li className={styles.headerPageItem}>
            <Link to="/home">
              <IoHomeOutline />
            </Link>
          </li>
          <li className={styles.headerPageItem}>
            <Link to="/watch">
              <MdOndemandVideo />
            </Link>
          </li>
          <li className={styles.headerPageItem}>
            <Link to="/groups">
              <MdGroups />
            </Link>
          </li>
          <li className={styles.headerPageItem}>
            <Link to="/message">
              <LuMessageCircle />
            </Link>
          </li>
          <li className={styles.headerPageItem}>
            <Link to="/settings">
              <IoSettingsOutline />
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.headerProfile}>
        <ul className={styles.headerProfileList}>
          <li className={styles.headerProfileItem}>
            <AiOutlineMessage />
          </li>
          <li className={styles.headerProfileItem}>
            <IoNotificationsOutline />
          </li>
          <li className={styles.headerProfileItem}>
            <Link to="/profile">
              <img
                src={require("../../assets/images/users/default.png")}
                alt=""
              />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
