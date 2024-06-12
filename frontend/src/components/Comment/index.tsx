import { useContext } from "react";
import { Link } from "react-router-dom";

import { ICommentFE } from "@/utils/common";

import { PostContext } from "@/components/Post";

import styles from "./index.module.scss";

function Comment({ comment: cmt }: { comment: ICommentFE }) {
  const { id, comment, createdDate, parentCommentId, postId, user, replies } =
    cmt;
  const { setReplyComment } = useContext(PostContext);

  return (
    <div className={styles.comment}>
      <Link to={""} className={styles.commentAvatar}>
        <img
          src={require("../../assets/images/users/girl.jpg")}
          alt={user?.userDisplayName}
        />
      </Link>
      <div className={styles.commentInfo}>
        <div className={styles.commentTop}>
          <Link to={""} className={styles.userName}>
            {user?.userDisplayName}
          </Link>
          <p className={styles.commentContent}>{comment}</p>
        </div>
        <div className={styles.commentAction}>
          <span className={styles.likeAction}>Thích</span>
          <span
            className={styles.commentAction}
            onClick={() => setReplyComment(cmt)}
          >
            Phản hồi
          </span>
        </div>
      </div>
    </div>
  );
}

export default Comment;
