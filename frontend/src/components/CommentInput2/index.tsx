import { useContext, useEffect, useRef } from "react";

import { FaCommentSlash } from "react-icons/fa6";

import { IPost2Provider, Post2Context } from "@/components/Post2";

import { IAddNewCommentDto } from "@/services/CommentAPI";

import { getUserInfo } from "@/utils/auth";

import styles from "./index.module.scss";

function CommentInput2({
  avatar,
  postId,
  onSubmit,
}: {
  avatar: any;
  postId: number;
  onSubmit: (comment: IAddNewCommentDto) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { replyComment, setReplyComment }: IPost2Provider =
    useContext(Post2Context);
  const userInfo = getUserInfo();

  useEffect(() => {
    if (replyComment?.parentCommentId) {
      inputRef.current?.focus();
    }
  }, [replyComment]);

  return (
    <>
      {replyComment?.comment && (
        <div className={styles.commentReply}>
          <p className={styles.commentReplyMessage}>
            You are replying and comment of:{" "}
            <b>{replyComment?.user.userDisplayName}</b>
          </p>
          <div
            className={styles.removeReplyIcon}
            title="Cancel reply this comment"
            onClick={() => {
              setReplyComment();
              if (inputRef.current) {
                inputRef.current.value = "";
              }
            }}
          >
            <FaCommentSlash />
          </div>
        </div>
      )}

      <div className={styles.commentInput}>
        <div className={styles.userAvatar}>
          <img src={avatar} alt="" />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter your public comment..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              const target = e.target as HTMLInputElement;
              const payload = {
                content: target.value,
                created_at: new Date().toISOString(),
                parent_comment_id: null,
                post_id: postId,
                user_id: userInfo.id,
              };
              // if reply a comment
              if (replyComment?.id) {
                payload.parent_comment_id = replyComment?.id;
              }
              onSubmit(payload);
              target.value = "";
              setReplyComment();
            }
          }}
        />
      </div>
    </>
  );
}

export default CommentInput2;
