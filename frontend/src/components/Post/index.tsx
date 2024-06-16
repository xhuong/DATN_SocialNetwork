import { Col, Row } from "antd";

import { ICommentFE, IPostFE, calculateTime } from "@/utils/common";

import CommentInput from "@/components/CommentInput";
import PostComments from "@/components/PostComments";

import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import { IoEarth } from "react-icons/io5";

import girl from "@/assets/images/users/girl.jpg";

import { createContext, useContext, useState } from "react";
import { IPostListProvider, PostListContext } from "@/layouts/MiddleSide";

import styles from "./index.module.scss";

export interface IPostProvider {
  replyComment: any;
  setReplyComment: any;
}

export const PostContext = createContext<IPostProvider>({
  replyComment: null,
  setReplyComment: () => {},
});

function Post({ post }: { post: IPostFE }) {
  const {
    commentCount,
    createdDate,
    images,
    likeCount,
    shareCount,
    title,
    comments,
    id,
    user,
    isLiked,
  } = post;
  const {
    handleLikeAPost,
    handleDislikeAPost,
    handleComment,
    userInfo,
  }: IPostListProvider = useContext(PostListContext);

  const [replyComment, setReplyComment] = useState<ICommentFE | null>();

  const valueContext = {
    replyComment,
    setReplyComment,
  };

  return (
    <PostContext.Provider value={{ ...valueContext }}>
      <div className={styles.post}>
        <div className={styles.postHeader}>
          <div className={styles.postAuthor}>
            <div className={styles.postAuthorImage}>
              <img src={require("../../assets/images/users/boy.jpg")} alt="" />
            </div>
            <div className={styles.postAuthorInfo}>
              <p className={styles.postAuthorName}>{user?.userDisplayName}</p>
              <div className={styles.postTime}>
                <span className={styles.postHeaderDate}>
                  {calculateTime(new Date(createdDate))} hours ago
                </span>
                <span className={styles.postTimeIcon}>
                  <IoEarth />
                </span>
              </div>
            </div>
          </div>
          <div className={styles.postHeaderAction}></div>
        </div>
        <div className={styles.postBody}>
          <p className={styles.postTitle}>{title}</p>
          {/* <ul className={styles.postImages}>
          <li className={styles.postImageItem}>
            <img src={require("../../assets/images/users/girl.jpg")} alt="" />
          </li>
        </ul> */}
          {/* user upload 4 image  */}
          {/* <Row gutter={[8, 8]} className={styles.postImages}>
          <Col xl={24} md={12}>
            <div className={styles.postImageItem}>
              <img src={require("../../assets/images/users/girl.jpg")} alt="" />
            </div>
          </Col>
          <Col xl={8} md={12}>
            <div className={styles.postImageItem}>
              <img src={require("../../assets/images/users/girl.jpg")} alt="" />
            </div>
          </Col>
          <Col xl={8} md={12}>
            <div className={styles.postImageItem}>
              <img src={require("../../assets/images/users/girl.jpg")} alt="" />
            </div>
          </Col>
          <Col xl={8} md={12}>
            <div className={styles.postImageItem}>
              <img src={require("../../assets/images/users/girl.jpg")} alt="" />
            </div>
          </Col>
        </Row> */}

          {/* user upload 1 image  */}
          {images?.map((image) => (
            <Row gutter={[8, 8]} className={styles.postImages} key={image.id}>
              <Col xl={24} md={12}>
                <div className={styles.postImageItem}>
                  <img src={image.image_url} alt="" />
                </div>
              </Col>
            </Row>
          ))}
        </div>
        <div className={styles.postFooter}>
          <div className={styles.postFooterInfo}>
            <div className={styles.postLike}>
              <span className={styles.postLikeIcon}>
                <BiSolidLike />
              </span>
              <span className={styles.postLikeCount}>{likeCount}</span>
            </div>
            <div className={styles.postCommentShare}>
              <span>
                <span className={styles.postCommentShareText}>
                  {commentCount} bình luận
                </span>
              </span>
              <span>
                <span className={styles.postCommentShareText}>
                  {shareCount} lượt chia sẻ
                </span>
              </span>
            </div>
          </div>
          <Row gutter={[8, 8]} className={styles.postFooterAction}>
            <Col xs={8} sm={8}>
              <div
                className={styles.postFooterActionItem}
                onClick={() => {
                  isLiked
                    ? handleDislikeAPost(userInfo?.id, id)
                    : handleLikeAPost(userInfo?.id, id);
                }}
              >
                <span>
                  <span
                    className={`${styles.postFooterActionItemIcon} ${
                      isLiked ? styles.likedPost : ""
                    }`}
                  >
                    {isLiked ? <BiSolidLike /> : <BiLike />}
                  </span>
                  <span className={styles.postFooterActionItemText}>
                    {isLiked ? "Đã thích" : "Thích"}
                  </span>
                </span>
              </div>
            </Col>
            <Col xs={8} sm={8}>
              <div className={styles.postFooterActionItem}>
                <span>
                  <span className={styles.postFooterActionItemIcon}>
                    <FaRegComment />
                  </span>
                  <span className={styles.postFooterActionItemText}>
                    Bình luận
                  </span>
                </span>
              </div>
            </Col>
            <Col xs={8} sm={8}>
              <div className={styles.postFooterActionItem}>
                <span>
                  <span className={styles.postFooterActionItemIcon}>
                    <RiShareForwardLine />
                  </span>
                  <span className={styles.postFooterActionItemText}>
                    Chia sẻ
                  </span>
                </span>
              </div>
            </Col>
          </Row>
        </div>
        <PostComments postComments={comments} />
        <CommentInput avatar={girl} postId={id} onSubmit={handleComment} />
      </div>
    </PostContext.Provider>
  );
}

export default Post;
