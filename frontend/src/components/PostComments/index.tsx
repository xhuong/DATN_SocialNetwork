import { Fragment } from "react";

import { ICommentFE } from "@/utils/common";

import Comment from "@/components/Comment";

import styles from "./index.module.scss";

function PostComments({ postComments }: { postComments: ICommentFE[] }) {
  return (
    <div className={styles.postComments}>
      {postComments.map((postComment, index) => (
        <Fragment key={index}>
          <Comment comment={postComment} />
          {postComment?.replies &&
            postComment?.replies?.map((reply) => (
              <div style={{ marginLeft: "56px" }} key={reply.id}>
                <Comment comment={reply} />
              </div>
            ))}
        </Fragment>
      ))}
    </div>
  );
}

export default PostComments;
