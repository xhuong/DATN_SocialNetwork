import { Fragment } from "react";

import { ICommentFE } from "@/utils/common";

import Comment2 from "@/components/Comment2";

import styles from "./index.module.scss";

function PostComments2({ postComments }: { postComments: ICommentFE[] }) {
  return (
    <div className={styles.postComments}>
      {postComments.map((postComment, index) => (
        <Fragment key={index}>
          <Comment2 comment={postComment} />
          {postComment?.replies &&
            postComment?.replies?.map((reply) => (
              <div style={{ marginLeft: "56px" }} key={reply.id}>
                <Comment2 comment={reply} />
              </div>
            ))}
        </Fragment>
      ))}
    </div>
  );
}

export default PostComments2;
