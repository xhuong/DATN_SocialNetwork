import { useCallback, useEffect, useState } from "react";
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
import {
  useCheckFollowedUserQuery,
  useGetFollowerUsersQuery,
  useLazyFollowUserQuery,
  useLazyUnfollowUserQuery,
} from "@/services/FollowAPI";

import { RiUserUnfollowLine } from "react-icons/ri";
import EditProfileInfoModal from "@/components/EditProfileInfoModal";
import UploadAvatarModal from "@/components/UploadAvatarModal";

import styles from "./index.module.scss";

const ProfilePage = () => {
  const userInfo: IUserBE | null = getUserInfo();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showUploadAvatarModal, setShowUploadAvatarModal] = useState(false);

  const profileId = Number.parseInt(searchParams.get("id") || "");

  const isSelf = userInfo.id == profileId;

  const {
    data,
    isSuccess,
    isError,
    refetch: refetchProfileInfo,
  } = useGetProfileInfoQuery(
    { userId: profileId },
    { skip: profileId === null }
  );

  const { data: isFollowedUser, refetch: recheckFollowedUser } =
    useCheckFollowedUserQuery(
      {
        user_id: profileId,
        follower_id: userInfo.id,
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );

  const {
    data: followers,
    isSuccess: isFetchFollowersSuccess,
    refetch: refetchFollowers,
  } = useGetFollowerUsersQuery(
    { id: profileId },
    { refetchOnMountOrArgChange: true }
  );

  const [followUser, { data: isFollowed, isFetching }] =
    useLazyFollowUserQuery();
  const [
    unFollowUser,
    { data: unFollowUserData, isSuccess: isSuccessUnfollowedUser },
  ] = useLazyUnfollowUserQuery();

  const onCancel = () => {
    setShowEditProfileModal(false);
  };

  const onCancelUploadAvatar = () => {
    setShowUploadAvatarModal(false);
  };

  const handleUpdateProfileInfo = useCallback(() => {
    Promise.all([
      refetchProfileInfo(),
      refetchFollowers(),
      recheckFollowedUser(),
    ]);
  }, []);

  const handleFollowUser = async (
    profileId: number,
    currentUserId: number,
    type: "follow" | "unfollow"
  ) => {
    type === "follow" &&
      (await followUser({
        user_id: profileId,
        follower_id: currentUserId,
      }));
    type === "unfollow" &&
      (await unFollowUser({
        user_id: profileId,
        follower_id: userInfo.id,
      }));
    handleUpdateProfileInfo();
  };

  useEffect(() => {
    if (isError || (!data && isSuccess)) {
      navigate("/error/404");
    }
  }, [data, isError, isSuccess]);

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
                    <IoIosCamera
                      className={styles.cameraIcon}
                      size={36}
                      onClick={() => setShowUploadAvatarModal(true)}
                    />
                  )}
                </div>
                <div className={styles.authorInfo}>
                  <h2 className={styles.authorName}>{data?.name}</h2>
                  <p className={styles.followingCount}>
                    {followers?.result.data.length} followers
                  </p>
                  <ul className={styles.followers}>
                    {followers?.result.data.map((item, index) => (
                      <li className={styles.follower} key={index}>
                        <div className={styles.followerAvatar}>
                          <img src={item.image_profile} alt={item.name} />
                        </div>
                        <div className={styles.userInfoCard}>
                          <div className={styles.userInfoCardAvatar}>
                            <img src={item.image_profile} alt={item.name} />
                          </div>
                          <p className={styles.userInfoCardName}>{item.name}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <ul className={styles.action}>
                {!isSelf && !isFollowedUser && (
                  <Button
                    btnType="primary"
                    isRounded
                    onClick={() =>
                      handleFollowUser(profileId, userInfo.id, "follow")
                    }
                  >
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
                    <Button
                      btnType="primary"
                      isRounded
                      onClick={() =>
                        handleFollowUser(profileId, userInfo.id, "unfollow")
                      }
                    >
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
                      <FaPlus /> Add story
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
                      <IoPencil /> Edit profile
                    </Button>
                  </li>
                )}
              </ul>
            </div>
            <div className={styles.body}>
              <Row gutter={{ xs: 16, md: 16 }}>
                <Col xs={8} style={{ marginTop: "24px" }}>
                  <div className={styles.introduce}>
                    <p className={styles.title}>Introduce</p>
                    {isSelf && (
                      <Button
                        btnType="secondary"
                        isRounded
                        isFullWidth
                        isNonePadding
                        onClick={() => {}}
                        style={{ marginBottom: "8px" }}
                      >
                        Add biography
                      </Button>
                    )}
                    <ul className={styles.introduceList}>
                      <li className={styles.introduceItem}>
                        <IoSchool className={styles.icon} />
                        <span>
                          School: <b>Vietnam - Korean University</b>
                        </span>
                      </li>
                      <li className={styles.introduceItem}>
                        <TiHome className={styles.icon} />
                        <span>
                          Live in <b>Tuyen Hoa</b>
                        </span>
                      </li>
                      <li className={styles.introduceItem}>
                        <SlUserFollowing className={styles.icon} />
                        <span>
                          <b>{followers?.result.data.length}</b> followers
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
                          Edit detail
                        </Button>
                        <Button
                          btnType="secondary"
                          isRounded
                          isFullWidth
                          isNonePadding
                          onClick={() => {}}
                        >
                          Add highlight content
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
                  {(isSelf || (!isSelf && isFollowedUser)) && (
                    <PostList
                      userId={isSelf ? userInfo.id : profileId}
                      id_user_viewing={userInfo.id}
                      is_includes_posts_of_following_users={false}
                      isSelf={isSelf}
                    />
                  )}
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
      <UploadAvatarModal
        show={showUploadAvatarModal}
        onSuccess={() => {
          refetchProfileInfo();
          setShowUploadAvatarModal(false);
        }}
        onCancel={onCancelUploadAvatar}
      />
    </>
  );
};

export default ProfilePage;
