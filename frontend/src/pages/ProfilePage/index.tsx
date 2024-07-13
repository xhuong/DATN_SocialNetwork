import { Col, Row } from "antd";

import { getUserInfo } from "@/utils/auth";
import { IUserBE } from "@/utils/common";

import Header from "@/layouts/Header";
import PostList from "@/layouts/PostList";

import Button from "@/components/Button";

import defaultAvatar from "@/assets/images/users/default.png";

import {
  FaPlus,
  IoIosCamera,
  IoPencil,
  IoSchool,
  SlUserFollowing,
  TiHome,
} from "@/pages/constant";

import styles from "./index.module.scss";
import { url } from "inspector";

const ProfilePage = () => {
  const userInfo: IUserBE | null = getUserInfo();

  return (
    <>
      <Header />
      <div
        className={styles.myProfile}
        style={{
          marginTop: "var(--header-height)",
        }}
      >
        <div className="container" style={{ position: "relative" }}>
          <div className={styles.wrapper}>
            <div
              className={styles.blurBackground}
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
              }}
            ></div>
            <div className={styles.backgroundCover}>
              <img
                src="https://images.unsplash.com/photo-1472289065668-ce650ac443d2?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>
          </div>
          <div className={styles.myProfileContainer}>
            <div className={styles.header}>
              <div className={styles.author}>
                <div className={styles.authorAvatar}>
                  <div className={styles.authorAvatarWrapper}>
                    <img src={userInfo.image_profile ?? defaultAvatar} alt="" />
                  </div>
                  <IoIosCamera className={styles.cameraIcon} size={36} />
                </div>
                <div className={styles.authorInfo}>
                  <h2 className={styles.authorName}>{userInfo.name}</h2>
                  <p className={styles.followingCount}>689 followers</p>
                </div>
              </div>
              <ul className={styles.action}>
                <li>
                  <Button
                    btnType="primary"
                    isRounded
                    isNonePadding
                    onClick={() => {}}
                  >
                    <FaPlus /> Thêm vào tin
                  </Button>
                </li>
                <li>
                  <Button
                    btnType="primary"
                    isRounded
                    isNonePadding
                    onClick={() => {}}
                  >
                    <IoPencil /> Chỉnh sửa trang cá nhân
                  </Button>
                </li>
              </ul>
            </div>
            <div className={styles.body}>
              <Row gutter={{ xs: 16, md: 16 }}>
                <Col xs={8}>
                  <div className={styles.introduce}>
                    <p className={styles.title}>Giới thiệu</p>
                    <Button
                      btnType="secondary"
                      isRounded
                      isFullWidth
                      isNonePadding
                      onClick={() => {}}
                      style={{ marginBottom: "8px" }}
                    >
                      Thêm tiểu sử
                    </Button>
                    <ul className={styles.introduceList}>
                      <li className={styles.introduceItem}>
                        <IoSchool className={styles.icon} />
                        <span>
                          Đã học tại <b>Trường THPT Tuyên Hóa</b>
                        </span>
                      </li>
                      <li className={styles.introduceItem}>
                        <TiHome className={styles.icon} />
                        <span>
                          Sống tại <b>Tuyên Hóa</b>
                        </span>
                      </li>
                      <li className={styles.introduceItem}>
                        <SlUserFollowing className={styles.icon} />
                        <span>
                          Có <b>149 người</b> theo dõi
                        </span>
                      </li>
                    </ul>
                    <Button
                      btnType="secondary"
                      isRounded
                      isFullWidth
                      isNonePadding
                      onClick={() => {}}
                      style={{ marginBottom: "8px" }}
                    >
                      Chỉnh sửa chi tiết
                    </Button>
                    <Button
                      btnType="secondary"
                      isRounded
                      isFullWidth
                      isNonePadding
                      onClick={() => {}}
                    >
                      Thêm nội dung đáng chú ý
                    </Button>
                  </div>
                </Col>
                <Col xs={16}>
                  <PostList />
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
