import React, {
  useEffect,
  useState,
  createContext,
  useCallback,
  useMemo,
} from "react";
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
  userId: number;
  id_user_viewing: number;
}

export const PostListContext = createContext<IPostListProvider>({
  handleLikeAPost: (userId: number, postId: number) => {},
  handleDislikeAPost: (userId: number, postId: number) => {},
  handleComment: (comment: IAddNewCommentDto) => {},
  userInfo: defaultUserInfo,
  userId: -1,
  id_user_viewing: -1,
});

function PostList({
  userId,
  id_user_viewing,
  is_includes_posts_of_following_users: isInclude,
  isSelf,
}: {
  userId: number;
  id_user_viewing: number;
  is_includes_posts_of_following_users: boolean;
  isSelf: boolean;
}) {
  const [postList, setPostList] = useState<IPostFE[]>([]);
  const isShowCreatePostModal = useSelector(
    (state: RootState) => state?.modal.isShow
  );

  const userInfo: IUserBE | null = getUserInfo();

  const [getPostList, { data, isSuccess }] = useLazyGetPostListByUserIdQuery();

  const [likeAPost] = useLazyLikeAPostQuery();

  const [dislikeAPost] = useDislikeAPostMutation();

  const [addNewComment] = useLazyAddNewCommentQuery();

  const handleLikeAPost = useCallback(
    async (userId: number, postId: number) => {
      if (userId && postId) {
        await likeAPost({ post_id: postId, user_id: id_user_viewing });
        await getPostList({
          id_user: userId,
          id_user_viewing: userInfo.id,
          is_includes_posts_of_following_users: isInclude,
        });
      }
    },
    [userId, userInfo, isInclude]
  );

  const handleDislikeAPost = useCallback(
    async (userId: number, postId: number) => {
      if (userId && postId) {
        await dislikeAPost({ post_id: postId, user_id: id_user_viewing });
        await getPostList({
          id_user: userId,
          id_user_viewing: userInfo.id,
          is_includes_posts_of_following_users: isInclude,
        });
      }
    },
    [userId, userInfo, isInclude]
  );

  const handleComment = useCallback(
    async (comment: IAddNewCommentDto) => {
      await addNewComment(comment);
      await getPostList({
        id_user: userId,
        id_user_viewing: userInfo.id,
        is_includes_posts_of_following_users: isInclude,
      });
    },
    [userId, userInfo, isInclude]
  );

  const onCreatePostSuccess = useCallback(() => {
    toast.error("Create a new post successfully ✨", {
      autoClose: 2000,
      theme: "light",
    });
    getPostList({
      id_user: userId,
      id_user_viewing: userInfo.id,
      is_includes_posts_of_following_users: isInclude,
    });
  }, [userId, userInfo, isInclude]);

  useEffect(() => {
    if (data && isSuccess) {
      const { data: res } = data?.result;
      const convertedData = mapPostListBEToPostListUI(res);
      setPostList(convertedData);
    }
  }, [data, isSuccess]);

  useEffect(() => {
    userId &&
      getPostList({
        id_user: userId,
        id_user_viewing: userInfo.id,
        is_includes_posts_of_following_users: isInclude,
      });
  }, [userId]);

  const defaultValue = {
    handleLikeAPost,
    handleDislikeAPost,
    handleComment,
    userInfo,
    id_user_viewing,
    userId,
  };

  return (
    <PostListContext.Provider value={{ ...defaultValue }}>
      <div className={styles.postList}>
        {isSelf && (
          <>
            <YourThink />
            <FollowCardList />
          </>
        )}
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

export default PostList;
