import { createContext, useContext, useState } from "react";
import { Col, Row } from "antd";

import { ICommentFE, IPostFE, calculateTime } from "@/utils/common";

import CommentInput from "@/components/CommentInput";
import PostComments from "@/components/PostComments";

import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import { RiShareForwardLine } from "react-icons/ri";
import { IoEarth } from "react-icons/io5";

import { IPostListProvider, PostListContext } from "@/layouts/PostList";

import { ELikeType } from "@/services/LikeAPI";

import styles from "./index.module.scss";

export interface IPostProvider {
  replyComment: any;
  setReplyComment: any;
}

export const PostContext = createContext<IPostProvider>({
  replyComment: null,
  setReplyComment: () => {},
});

function Post({ post, avatar }: { post: IPostFE; avatar: string }) {
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
    feeling,
  } = post;
  const { handleLikePost, handleComment, userId }: IPostListProvider =
    useContext(PostListContext);

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
              <img src={user.imageProfile} alt={user.userDisplayName} />
            </div>
            <div className={styles.postAuthorInfo}>
              <div className={styles.postAuthNameWrapper}>
                <p className={styles.postAuthorName}>{user?.userDisplayName}</p>
                {feeling && (
                  <p className={styles.postAuthFeeling}>
                    's feeling <b>{feeling}</b>
                  </p>
                )}
              </div>
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
          {/* user upload 4 image  */}
          {images.length > 1 && (
            <Row gutter={[8, 8]} className={styles.postImages}>
              {images.map((image) => (
                <Col xs={12}>
                  <div className={styles.postImageItem}>
                    <img src={image.image_url} alt="" />
                  </div>
                </Col>
              ))}
            </Row>
          )}

          {/* user upload 1 image  */}
          {images.length === 1 && (
            <Row
              gutter={[8, 8]}
              className={styles.postImages}
              key={images[0].id}
            >
              <Col xl={24} md={12}>
                <div className={styles.postImageItem}>
                  <img src={images[0].image_url} alt="" />
                </div>
              </Col>
            </Row>
          )}
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
                  {commentCount} {"comment" + `${commentCount > 1 ? "s" : ""}`}
                </span>
              </span>
              <span>
                <span className={styles.postCommentShareText}>
                  {shareCount} {"share" + `${shareCount > 1 ? "s" : ""}`}
                </span>
              </span>
            </div>
          </div>
          <Row gutter={[8, 8]} className={styles.postFooterAction}>
            <Col xs={8} sm={8}>
              <div
                className={styles.postFooterActionItem}
                onClick={() =>
                  handleLikePost(
                    userId,
                    id,
                    isLiked ? ELikeType.DISLIKE : ELikeType.LIKE
                  )
                }
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
                    {isLiked ? "Liked" : "Like"}
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
                    Add comment
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
                  <span className={styles.postFooterActionItemText}>Share</span>
                </span>
              </div>
            </Col>
          </Row>
        </div>
        <PostComments postComments={comments} />
        <CommentInput avatar={avatar} postId={id} onSubmit={handleComment} />
      </div>
    </PostContext.Provider>
  );
}

export default Post;
