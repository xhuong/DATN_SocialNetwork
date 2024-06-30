import React, { createContext, useEffect, useState } from "react";

import Post from "@/components/Post";

import {
  useDislikeAPostMutation,
  useLazyLikeAPostQuery,
} from "@/services/LikeAPI";
import {
  IAddNewCommentDto,
  useLazyAddNewCommentQuery,
} from "@/services/CommentAPI";
import {
  useGetPostListByUserIdQuery,
  useLazyGetPostListByUserIdQuery,
} from "@/services/PostAPI";

import { IPostFE, IUserBE, mapPostListBEToPostListUI } from "@/utils/common";
import { defaultUserInfo, getUserInfo } from "@/utils/auth";

import styles from "./index.module.scss";

export interface IPostListProvider {
  handleLikeAPost: (userId: number, postId: number) => void;
  handleDislikeAPost: (userId: number, postId: number) => void;
  handleComment: (comment: IAddNewCommentDto) => void;
  userInfo: IUserBE;
}

export const PostListContext = createContext<IPostListProvider>({
  handleLikeAPost: (userId: number, postId: number) => {},
  handleDislikeAPost: (userId: number, postId: number) => {},
  handleComment: (comment: IAddNewCommentDto) => {},
  userInfo: defaultUserInfo,
});

function RecommendLayout() {
  const [postList, setPostList] = useState<IPostFE[]>([]);

  const userInfo: IUserBE | null = getUserInfo();

  const [getPostList] = useLazyGetPostListByUserIdQuery();
  const [likeAPost] = useLazyLikeAPostQuery();
  const [dislikeAPost] = useDislikeAPostMutation();
  const [addNewComment] = useLazyAddNewCommentQuery();

  const { data, isSuccess } = useGetPostListByUserIdQuery(
    {
      id_user: userInfo.id,
    },
    { refetchOnMountOrArgChange: true }
  );

  const handleLikeAPost = (userId: number, postId: number) => {
    if (userId && postId) {
      likeAPost({ post_id: postId, user_id: userId });
      getPostList({ id_user: userInfo.id });
    }
  };

  const handleDislikeAPost = (userId: number, postId: number) => {
    if (userId && postId) {
      dislikeAPost({ post_id: postId, user_id: userId });
      getPostList({ id_user: userInfo.id });
    }
  };

  const handleComment = (comment: IAddNewCommentDto) => {
    addNewComment(comment);
    getPostList({ id_user: userInfo.id });
  };

  const defaultValue = {
    handleLikeAPost,
    handleDislikeAPost,
    handleComment,
    userInfo,
  };

  useEffect(() => {
    if (isSuccess) {
      const { data: res } = data?.result;
      const convertedData = mapPostListBEToPostListUI(res);
      setPostList(convertedData);
    }
  }, [data, isSuccess]);

  return (
    <PostListContext.Provider value={{ ...defaultValue }}>
      <div className={styles.recommendLayout}>
        <p className={styles.recommendTitle}>This is recommend posts for you</p>
        {postList?.map((post) => {
          return (
            <React.Fragment key={post.id}>
              <Post post={post} />
            </React.Fragment>
          );
        })}
      </div>
    </PostListContext.Provider>
  );
}

export default RecommendLayout;
