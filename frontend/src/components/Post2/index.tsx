import { createContext, useContext, useState } from "react";
import { Button as AntButton, Col, Row } from "antd";

import { ICommentFE, IPostFE, calculateTime } from "@/utils/common";
import { detechMediaType } from "@/utils";

import CommentInput2 from "@/components/CommentInput2";
import PostComments2 from "@/components/PostComments2";

import {
  BiLike,
  BiSolidLike,
  FaRegComment,
  IoEarth,
  RiShareForwardLine,
} from "@/components/Post/constant";

import {
  ESavePostType,
  IPostList2Provider,
  PostList2Context,
} from "@/layouts/PostList2";

import { ELikeType } from "@/services/LikeAPI";

import styles from "./index.module.scss";
import { BookMarkBorderSvg, BookMarkSvg } from "@/assets/icons";

export interface IPost2Provider {
  replyComment: any;
  setReplyComment: any;
}

export const Post2Context = createContext<IPost2Provider>({
  replyComment: null,
  setReplyComment: () => {},
});

function Post2({
  post,
  avatar,
  currentUserId,
}: {
  post: IPostFE;
  avatar: string;
  currentUserId: number;
}) {
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
    isSavedPost,
  } = post;
  const {
    handleLikePost,
    handleComment,
    handleSavePost,
    idUser,
  }: IPostList2Provider = useContext(PostList2Context);

  const [replyComment, setReplyComment] = useState<ICommentFE | null>();

  const valueContext = {
    replyComment,
    setReplyComment,
  };

  return (
    <Post2Context.Provider value={{ ...valueContext }}>
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
          <div className={styles.postHeaderAction}>
            {isSavedPost ? (
              <AntButton
                className={styles.savePostBtn}
                shape="circle"
                style={{ border: "none" }}
                onClick={() =>
                  handleSavePost(id, currentUserId, ESavePostType.UNSAVE)
                }
              >
                <BookMarkSvg />
              </AntButton>
            ) : (
              <AntButton
                className={styles.savePostBtn}
                shape="circle"
                style={{ border: "none" }}
                onClick={() =>
                  handleSavePost(id, currentUserId, ESavePostType.SAVE)
                }
              >
                <BookMarkBorderSvg />
              </AntButton>
            )}
          </div>
        </div>
        <div className={styles.postBody}>
          <p className={styles.postTitle}>{title}</p>
          {/* user upload 4 image  */}

          {images?.length > 1 &&
            detechMediaType(images[0]?.image_url) === "img" &&
            images.length > 1 && (
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
          {images.length === 1 &&
            detechMediaType(images[0]?.image_url) === "img" && (
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

          {/* user upload 1 video  */}
          {images?.length > 0 &&
            detechMediaType(images[0]?.image_url) === "video" && (
              <Row
                gutter={[8, 8]}
                className={styles.postImages}
                key={images[0].id}
              >
                <Col xl={24} md={12}>
                  <div className={styles.postImageItem}>
                    <video
                      width={"100%"}
                      height={"100%"}
                      controls
                      style={{ objectFit: "cover", objectPosition: "center" }}
                    >
                      <source src={images[0]?.image_url} />
                    </video>
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
                    idUser,
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
        <PostComments2 postComments={comments} />
        <CommentInput2 avatar={avatar} postId={id} onSubmit={handleComment} />
      </div>
    </Post2Context.Provider>
  );
}

export default Post2;
