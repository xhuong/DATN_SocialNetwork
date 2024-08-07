import React, { useEffect, useState, createContext, useCallback } from "react";
import { toast } from "react-toastify";

import { IPostFE, IUserBE, mapPostListBEToPostListUI } from "@/utils/common";

import {
  useLazyGetLatestLikedPostQuery,
  useLazyGetNotLikedPostsByUserIdQuery,
  useLazyGetPostListByUserIdQuery,
  useLazyGetSavedPostsByUserIdQuery,
  useLazySavePostQuery,
} from "@/services/PostAPI";

import { ELikeType, useLazyLikePostQuery } from "@/services/LikeAPI";

import {
  IAddNewCommentDto,
  useLazyAddNewCommentQuery,
} from "@/services/CommentAPI";
import { defaultUserInfo, getUserInfo } from "@/utils/auth";
import Post2 from "@/components/Post2";

import styles from "./index.module.scss";
import { Alert } from "antd";
import {
  PostDto,
  useLazyGetRecommendPostsQuery,
} from "@/services/RecommendAPI";

export interface IPostList2Provider {
  handleLikePost: (userId: number, postId: number, type: ELikeType) => void;
  handleComment: (comment: IAddNewCommentDto) => void;
  handleSavePost: (postId: number, userId: number, type: ESavePostType) => void;
  // userInfo: IUserBE;
  // userId: number;
  // id_user_viewing: number;
  idUser: number;
}

export const PostList2Context = createContext<IPostList2Provider>({
  handleLikePost: (userId: number, postId: number, type: ELikeType) => {},
  handleComment: (comment: IAddNewCommentDto) => {},
  handleSavePost: (postId: number, userId: number, type: ESavePostType) => {},
  // userInfo: defaultUserInfo,
  // userId: -1,
  // id_user_viewing: -1,
  idUser: -1,
});

export enum ESavePostType {
  SAVE = 1,
  UNSAVE = 0,
}

function PostList2({
  idUser,
  isGetSavedPost,
  isGetRecommendPost,
}: {
  idUser: number;
  isGetSavedPost?: boolean;
  isGetRecommendPost?: boolean;
}) {
  // {
  //   userId,
  //   id_user_viewing,
  //   is_includes_posts_of_following_users: isInclude,
  //   isSelf,
  // }: {
  //   userId: number;
  //   id_user_viewing: number;
  //   is_includes_posts_of_following_users: boolean;
  //   isSelf: boolean;
  // }
  const [postList, setPostList] = useState<IPostFE[]>([]);

  const userInfo: IUserBE | null = getUserInfo();

  const [getSavedPosts, { data, isSuccess }] =
    useLazyGetSavedPostsByUserIdQuery();
  const [
    getRecommentPosts,
    { data: recommendPostsData, isSuccess: isGetRecommendPostsSuccess },
  ] = useLazyGetRecommendPostsQuery();
  const [
    getLatestLikedPost,
    { data: latestLikedPostData, isSuccess: isGetLatestLikedPostSuccess },
  ] = useLazyGetLatestLikedPostQuery();
  const [
    getNotLikedPosts,
    { data: notLikedPostsData, isSuccess: isGetNotLikedPostsSuccess },
  ] = useLazyGetNotLikedPostsByUserIdQuery();

  const [savePost, { isSuccess: isSuccessSavePost }] = useLazySavePostQuery();

  const [likePost] = useLazyLikePostQuery();

  const [addNewComment] = useLazyAddNewCommentQuery();

  const handleLikePost = async (
    userId: number,
    postId: number,
    type: ELikeType
  ) => {
    if (userId && postId && type) {
      await likePost({
        type,
        post_id: postId,
        user_id: userId,
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
  };

  const handleComment = async (comment: IAddNewCommentDto) => {
    await addNewComment(comment);
    await getSavedPosts({
      userId: idUser,
    });
  };

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

  useEffect(() => {
    if (data && isSuccess) {
      const { data: res } = data?.result;
      const convertedData = mapPostListBEToPostListUI(res);
      setPostList(convertedData);
    }
  }, [data, isSuccess]);

  const handleGetRecommentPost = async () => {
    const data: any = await Promise.all([
      getLatestLikedPost({ id: userInfo.id }),
      getNotLikedPosts({ userId: userInfo.id }),
    ])
      .then(([latestLikedPost, notLikedPosts]) => [
        latestLikedPost?.data?.result?.data,
        notLikedPosts?.data?.result?.data,
      ])
      .catch((err) => {
        throw new Error(err);
      });
    if (data[0]?.length > 0 && data[1]?.length > 0) {
      // use data as payload for get recommentPosts API here
      // todo...
      getRecommentPosts({
        current_id_user: userInfo.id,
        liked_posts: data[0],
        unliked_posts: data[1],
      });
    }
  };

  useEffect(() => {
    if (idUser) {
      if (isGetSavedPost) {
        getSavedPosts({ userId: idUser });
      } else if (isGetRecommendPost) {
        handleGetRecommentPost();
      }
    }
  }, [idUser, isGetSavedPost, isGetRecommendPost]);

  const defaultValue = {
    handleLikePost,
    handleComment,
    handleSavePost,
    idUser,
  };

  return (
    <PostList2Context.Provider value={{ ...defaultValue }}>
      <div className={styles.postList}>
        {postList?.length > 0 &&
          postList?.map((post) => {
            return (
              <React.Fragment key={post.id}>
                <Post2
                  post={post}
                  avatar={userInfo.image_profile}
                  currentUserId={userInfo.id}
                />
              </React.Fragment>
            );
          })}
        {!postList?.length && (
          <Alert
            closable
            style={{ borderRadius: "4px" }}
            showIcon
            type="info"
            message="Post list is empty for now!"
          />
        )}
      </div>
    </PostList2Context.Provider>
  );
}

export default PostList2;
