import { Link, useNavigate } from "react-router-dom";

import {
  IoSettingsOutline,
  IoNotificationsOutline,
  IoHomeOutline,
} from "react-icons/io5";
import { LuMessageCircle, LuLogOut } from "react-icons/lu";
import { BsPostcard } from "react-icons/bs";
import { MdGroups } from "react-icons/md";
import { AiOutlineMessage, AiOutlineSetting } from "react-icons/ai";
import { IoIosSearch } from "react-icons/io";

import Chat from "@/layouts/ChatLayout/components/Chat";
import { logOut } from "@/utils/auth";
import UserProfile from "@/components/UserProfile";
import girl from "@/assets/images/users/girl.jpg";

import styles from "./index.module.scss";
import { useDispatch } from "react-redux";
import { openChatModal } from "@/redux/slices/chat";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showChatModal = () => {
    dispatch(openChatModal());
  };

  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

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
            <Link to="/">
              <IoHomeOutline />
            </Link>
          </li>
          <li className={styles.headerPageItem}>
            <Link to="/recommend">
              <BsPostcard />
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
            <div className={styles.headerIcon} onClick={showChatModal}>
              <AiOutlineMessage />
            </div>
          </li>
          <li className={styles.headerProfileItem}>
            <div className={styles.headerIcon}>
              <IoNotificationsOutline />
            </div>
          </li>
          <li className={styles.headerProfileItem}>
            <div className={styles.headerIcon}>
              <img
                src={require("../../assets/images/users/default.png")}
                alt=""
              />
            </div>
            <div className={styles.headerCard}>
              <div className={styles.headerCardInfo}>
                <div className={styles.headerCardInfoWrapper}>
                  <UserProfile
                    image={girl}
                    userDisplayName="Xuân Hướng"
                    isRounded
                    bgGray
                    canNegative
                  />
                </div>
                <ul className={styles.headerCardInfoList}>
                  <li className={styles.headerCardInfoItem}>
                    <span className={styles.headerCardInfoIcon}>
                      <AiOutlineSetting />
                    </span>
                    <p>Cài đặt</p>
                  </li>
                  <li
                    className={styles.headerCardInfoItem}
                    onClick={handleLogout}
                  >
                    <span className={styles.headerCardInfoIcon}>
                      <LuLogOut />
                    </span>
                    <p>Đăng xuất</p>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <Chat />
    </div>
  );
}
