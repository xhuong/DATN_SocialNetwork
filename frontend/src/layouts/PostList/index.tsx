import React, { useEffect, useState, createContext, useCallback } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "@/redux/store";

import { IPostFE, IUserBE, mapPostListBEToPostListUI } from "@/utils/common";

import {
  useLazyGetPostListByUserIdQuery,
  useLazySavePostQuery,
} from "@/services/PostAPI";

import { ELikeType, useLazyLikePostQuery } from "@/services/LikeAPI";

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

export interface IPostListProvider {
  handleLikePost: (userId: number, postId: number, type: ELikeType) => void;
  handleComment: (comment: IAddNewCommentDto) => void;
  handleSavePost: (postId: number, userId: number, type: ESavePostType) => void;
  userInfo: IUserBE;
  userId: number;
  id_user_viewing: number;
}

export const PostListContext = createContext<IPostListProvider>({
  handleLikePost: (userId: number, postId: number, type: ELikeType) => {},
  handleComment: (comment: IAddNewCommentDto) => {},
  handleSavePost: (postId: number, userId: number, type: ESavePostType) => {},
  userInfo: defaultUserInfo,
  userId: -1,
  id_user_viewing: -1,
});

export enum ESavePostType {
  SAVE = 1,
  UNSAVE = 0,
}

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

  const [savePost, { isSuccess: isSuccessSavePost }] = useLazySavePostQuery();

  const [likePost] = useLazyLikePostQuery();

  const [addNewComment] = useLazyAddNewCommentQuery();

  const handleLikePost = useCallback(
    async (userId: number, postId: number, type: ELikeType) => {
      if (userId && postId && type) {
        console.log(userId, postId, type);
        await likePost({
          type,
          post_id: postId,
          user_id: id_user_viewing,
        });
        const clonePosts = [...postList];
        const postIndex = clonePosts.findIndex((post) => post.id === postId);
        if (type === ELikeType.LIKE) {
          clonePosts[postIndex].isLiked = true;
          clonePosts[postIndex].likeCount += 1;
        } else if (type === ELikeType.DISLIKE) {
          clonePosts[postIndex].isLiked = false;
          clonePosts[postIndex].likeCount -= 1;
        }
        setPostList(clonePosts);
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

  const handleSavePost = async (
    postId: number,
    userId: number,
    type: ESavePostType
  ) => {
    if (postId && userId) {
      await savePost({ post_id: postId, user_id: userId, type: type })
        .then(() => {
          toast.success(
            `You have ${type ? "saved" : "unsaved"} post successfully!`,
            {
              autoClose: 1000,
              theme: "light",
              position: "top-center",
            }
          );
        })
        .catch((err) => {
          console.log(err);
        });
      const clonePosts = [...postList];
      const postIndex = clonePosts.findIndex((post) => post?.id === postId);
      if (type === ESavePostType.SAVE) {
        clonePosts[postIndex].isSavedPost = true;
      } else if (type === ESavePostType.UNSAVE) {
        clonePosts[postIndex].isSavedPost = false;
      }
      setPostList(clonePosts);
    }
  };

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
    handleLikePost,
    handleComment,
    handleSavePost,
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
              <Post
                post={post}
                avatar={userInfo.image_profile}
                currentUserId={userInfo.id}
              />
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
