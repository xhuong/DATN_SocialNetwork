import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Alert, Col, Row } from "antd";

import { getUserInfo } from "@/utils/auth";
import { IUserBE } from "@/utils/common";

import Header from "@/layouts/Header";
import PostList from "@/layouts/PostList";

import Button from "@/components/Button";

import {
  FaPlus,
  IoIosCamera,
  IoPencil,
  IoSchool,
  SlUserFollowing,
  TiHome,
} from "@/pages/constant";

import { useGetProfileInfoQuery } from "@/services/UserAPI";
import { useCheckFollowedUserQuery } from "@/services/FollowAPI";

import styles from "./index.module.scss";
import { RiUserUnfollowLine } from "react-icons/ri";
import EditProfileInfoModal from "@/components/EditProfileInfoModal";

const ProfilePage = () => {
  const userInfo: IUserBE | null = getUserInfo();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  const profileId = Number.parseInt(searchParams.get("id") || "");

  const isSelf = userInfo.id == profileId;

  const { data, isSuccess, isError } = useGetProfileInfoQuery(
    { userId: profileId },
    { skip: profileId === null }
  );

  const { data: isFollowedUser } = useCheckFollowedUserQuery({
    user_id: userInfo.id,
    follower_id: profileId,
  });

  useEffect(() => {
    if (isError || (!data && isSuccess)) {
      navigate("/error/404");
    }
  }, [data, isError, isSuccess]);

  const onCancel = () => {
    setShowEditProfileModal(false);
  };
  console.log("sds", isSelf);

  console.log("!isSelf && isFollowedUser", !isSelf && isFollowedUser);

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
                    <img src={data?.image_profile} alt="" />
                  </div>
                  {isSelf && (
                    <IoIosCamera className={styles.cameraIcon} size={36} />
                  )}
                </div>
                <div className={styles.authorInfo}>
                  <h2 className={styles.authorName}>{data?.name}</h2>
                  <p className={styles.followingCount}>689 followers</p>
                </div>
              </div>
              <ul className={styles.action}>
                {!isSelf && !isFollowedUser && (
                  <Button btnType="primary" isRounded onClick={() => {}}>
                    <FaPlus /> Follow
                  </Button>
                )}
                {isFollowedUser && (
                  <>
                    <Alert
                      message="Followed"
                      type="success"
                      showIcon
                      style={{ borderRadius: "8px" }}
                    />
                    <Button btnType="primary" isRounded onClick={() => {}}>
                      <RiUserUnfollowLine /> Unfollow
                    </Button>
                  </>
                )}
                {isSelf && (
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
                )}
                {isSelf && (
                  <li>
                    <Button
                      btnType="primary"
                      isRounded
                      isNonePadding
                      onClick={() => setShowEditProfileModal(true)}
                    >
                      <IoPencil /> Chỉnh sửa trang cá nhân
                    </Button>
                  </li>
                )}
              </ul>
            </div>
            <div className={styles.body}>
              <Row gutter={{ xs: 16, md: 16 }}>
                <Col xs={8} style={{ marginTop: "40px" }}>
                  <div className={styles.introduce}>
                    <p className={styles.title}>Giới thiệu</p>
                    {isSelf && (
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
                    )}
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
                    {isSelf && (
                      <>
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
                      </>
                    )}
                  </div>
                </Col>
                <Col xs={16}>
                  {!isSelf && !isFollowedUser && (
                    <Alert
                      message="Hey you"
                      description="You can't seeing posts cause you haven't followed this user yet."
                      type="info"
                      showIcon
                      className={styles.postInformMessage}
                    />
                  )}
                  {/* {(isSelf || (!isSelf && isFollowedUser)) && (
                    <PostList userId={userInfo.id} isSelf={isSelf} />
                  )} */}
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
      <EditProfileInfoModal
        isShow={showEditProfileModal}
        userId={userInfo.id}
        onCancel={onCancel}
      />
    </>
  );
};

export default ProfilePage;
