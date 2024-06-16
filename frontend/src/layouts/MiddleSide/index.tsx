import React, { useEffect, useState, createContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

import { IPostFE, IUserBE, mapPostListBEToPostListUI } from "@/utils/common";

import {
  useGetPostListByUserIdQuery,
  useLazyGetPostListByUserIdQuery,
} from "@/services/PostAPI";

import {
  useDislikeAPostMutation,
  useLazyLikeAPostQuery,
} from "@/services/LikeAPI";

import {
  IAddNewCommentDto,
  useLazyAddNewCommentQuery,
} from "@/services/CommentAPI";
import { defaultUserInfo, getUserInfo } from "@/utils/auth";

import CreatePostModal from "@/components/CreatePostModal";
import YourThink from "@/components/YourThink";
import Post from "@/components/Post";

import FollowCardList from "@/layouts/FollowCardList";

import styles from "./index.module.scss";
import { toast } from "react-toastify";

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

function MiddleSide() {
  const [postList, setPostList] = useState<IPostFE[]>([]);
  const isShowCreatePostModal = useSelector(
    (state: RootState) => state?.modal.isShow
  );

  const userInfo: IUserBE | null = getUserInfo();

  const { data, isSuccess } = useGetPostListByUserIdQuery({
    id_user: userInfo.id,
  });

  const [getPostList] = useLazyGetPostListByUserIdQuery();

  const [likeAPost] = useLazyLikeAPostQuery();

  const [dislikeAPost] = useDislikeAPostMutation();

  const [addNewComment] = useLazyAddNewCommentQuery();

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

  const onCreatePostSuccess = () => {
    toast.error("Create a new post successfully ✨", {
      autoClose: 2000,
      theme: "light",
    });
    getPostList({ id_user: userInfo.id });
  };

  useEffect(() => {
    if (isSuccess) {
      const { data: res } = data?.result;
      const convertedData = mapPostListBEToPostListUI(res);
      setPostList(convertedData);
    }
  }, [data, isSuccess]);

  const defaultValue = {
    handleLikeAPost,
    handleDislikeAPost,
    handleComment,
    userInfo,
  };

  return (
    <PostListContext.Provider value={{ ...defaultValue }}>
      <div className={styles.middleSide}>
        <YourThink />
        <FollowCardList />
        {postList?.map((post) => {
          return (
            <React.Fragment key={post.id}>
              <Post post={post} />
            </React.Fragment>
          );
        })}
      </div>
      <CreatePostModal
        isShow={isShowCreatePostModal}
        onSuccess={onCreatePostSuccess}
      />
    </PostListContext.Provider>
  );
}

export default MiddleSide;
