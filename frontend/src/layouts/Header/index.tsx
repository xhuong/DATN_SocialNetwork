import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Chat from "@/layouts/ChatLayout/components/Chat";
import { getUserInfo, logOut } from "@/utils/auth";
import UserProfile from "@/components/UserProfile";

import { openChatModal } from "@/redux/slices/chat";

import {
  AiOutlineMessage,
  AiOutlineSetting,
  BsPostcard,
  IoHomeOutline,
  IoIosSearch,
  IoNotificationsOutline,
  IoSettingsOutline,
  LuLogOut,
  LuMessageCircle,
  MdGroups,
} from "./constant";

import styles from "./index.module.scss";
import { useLazyFindUsersByNameQuery } from "@/services/UserAPI";
import { IUserResponseType } from "@/utils/user";
import { Alert } from "antd";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [searchUsers, setSearchUsers] = useState<IUserResponseType[]>([]);
  const [findUsersByName, { data: searchUsers, isSuccess, isFetching }] =
    useLazyFindUsersByNameQuery();

  const userInfo = getUserInfo();

  const showChatModal = useCallback(() => {
    dispatch(openChatModal());
  }, []);

  const handleLogout = useCallback(() => {
    logOut();
    navigate("/login");
  }, []);

  const HEADER_PAGES = useMemo(
    () => [
      { path: "/", icon: <IoHomeOutline /> },
      { path: "/recommend", icon: <BsPostcard /> },
      { path: "/groups", icon: <MdGroups /> },
      { path: "/message", icon: <LuMessageCircle /> },
      { path: "/settings", icon: <IoSettingsOutline /> },
    ],
    []
  );

  const handleOnChange = useCallback((e: any) => {
    setTimeout(async () => {
      try {
        const name = e.target.value.trim();
        if (name) {
          console.log("calling this after 100ms");
          await findUsersByName({ name: name });
        }
      } catch (error) {}
    }, 100);
  }, []);

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <div className={styles.headerLogo}>
          <img src={require("@/assets/images/logo.png")} alt="" />
        </div>
        <div className={styles.headerSearchWrapper}>
          <div className={styles.headerSearch}>
            <IoIosSearch />
            <input
              type="text"
              placeholder="searching user..."
              onChange={handleOnChange}
            />
          </div>
          <div className={styles.headerSearchResult}>
            {!searchUsers && <p>Nothing to display...</p>}
            {isFetching && <p>Searching user...</p>}
            {!isFetching && searchUsers && (
              <ul className={styles.resultList}>
                {searchUsers.map((user: IUserResponseType) => (
                  <li className={styles.resultItem}>
                    <UserProfile
                      isRounded
                      canNegative
                      idUser={user.id}
                      userDisplayName={user.name}
                      image={user.image_profile}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <div className={styles.headerPage}>
        <ul className={styles.headerPageList}>
          {HEADER_PAGES.map((page) => (
            <li className={styles.headerPageItem}>
              <Link to={page.path}>{page.icon}</Link>
            </li>
          ))}
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
              <img src={userInfo.image_profile} alt="" />
            </div>
            <div className={styles.headerCard}>
              <div className={styles.headerCardInfo}>
                <div className={styles.headerCardInfoWrapper}>
                  <UserProfile
                    image={userInfo.image_profile}
                    userDisplayName={userInfo.name}
                    idUser={userInfo.id}
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
                    <p>Setting</p>
                  </li>
                  <li
                    className={styles.headerCardInfoItem}
                    onClick={handleLogout}
                  >
                    <span className={styles.headerCardInfoIcon}>
                      <LuLogOut />
                    </span>
                    <p>Logout</p>
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
