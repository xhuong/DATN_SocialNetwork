// import React, { createContext, useEffect, useState } from "react";

// import Post from "@/components/Post";

// import { ELikeType, useLazyLikePostQuery } from "@/services/LikeAPI";
// import {
//   IAddNewCommentDto,
//   useLazyAddNewCommentQuery,
// } from "@/services/CommentAPI";
// import {
//   useGetPostListByUserIdQuery,
//   useLazyGetPostListByUserIdQuery,
// } from "@/services/PostAPI";

// import { IPostFE, IUserBE, mapPostListBEToPostListUI } from "@/utils/common";
// import { defaultUserInfo, getUserInfo } from "@/utils/auth";

// import styles from "./index.module.scss";
// import {
//   useGetRecommendPostsQuery,
//   useLazyGetRecommendPostsQuery,
// } from "@/services/RecommendAPI";

// export interface IPostListProvider {
//   handleLikePost: (userId: number, postId: number) => void;
//   handleDislikeAPost: (userId: number, postId: number) => void;
//   handleComment: (comment: IAddNewCommentDto) => void;
//   userInfo: IUserBE;
// }

// export const PostListContext = createContext<IPostListProvider>({
//   handleLikePost: (userId: number, postId: number) => {},
//   handleDislikeAPost: (userId: number, postId: number) => {},
//   handleComment: (comment: IAddNewCommentDto) => {},
//   userInfo: defaultUserInfo,
// });

function RecommendLayout() {
  // const [postList, setPostList] = useState<IPostFE[]>([]);

  // const userInfo: IUserBE | null = getUserInfo();

  // const [getPostList] = useLazyGetPostListByUserIdQuery();
  // const [likePost] = useLazyLikePostQuery();
  // const [addNewComment] = useLazyAddNewCommentQuery();

  // const { data, isSuccess } = useGetRecommendPostsQuery({
  //   current_id_user: 2,
  //   liked_posts: [
  //     {
  //       post_id: 1,
  //       title: "React Developer",
  //     },
  //   ],
  //   unliked_posts: [
  //     { post_id: 1, title: "Introduction to Machine Learning Algorithms" },
  //     { post_id: 2, title: "Getting Started with React Components" },
  //     { post_id: 3, title: "Living a Balanced Life" },
  //     { post_id: 4, title: "The Evolution of Electric Cars" },
  //     { post_id: 5, title: "Advanced Machine Learning Techniques" },
  //     { post_id: 6, title: "State Management in React" },
  //     { post_id: 7, title: "Mindfulness and Life Balance" },
  //     { post_id: 8, title: "Top Cars of 2024" },
  //     { post_id: 9, title: "Deep Learning for Image Recognition" },
  //     { post_id: 10, title: "Building Reusable React Components" },
  //     { post_id: 11, title: "Life Lessons from Great Leaders" },
  //     { post_id: 12, title: "The Future of Autonomous Cars" },
  //     { post_id: 13, title: "Start Learning Machine Learning" },
  //     { post_id: 14, title: "React Hooks Explained" },
  //     { post_id: 15, title: "Creating a Meaningful Life" },
  //     { post_id: 16, title: "Car Maintenance Tips for Longevity" },
  //     { post_id: 17, title: "Machine Learning in Healthcare" },
  //     { post_id: 18, title: "Optimizing React Performance" },
  //     { post_id: 19, title: "Finding Purpose in Life" },
  //     { post_id: 20, title: "The Latest in Car Technology" },
  //   ],
  // });

  // const handleLikePost = (userId: number, postId: number) => {
  //   if (userId && postId) {
  //     likePost({ post_id: postId, user_id: userId, type: ELikeType.LIKE });
  // getPostList({ id_user: userInfo.id });
  //   }
  // };

  // const handleDislikeAPost = (userId: number, postId: number) => {
  //   if (userId && postId) {
  //     dislikeAPost({ post_id: postId, user_id: userId });
  // getPostList({ id_user: userInfo.id });
  //   }
  // };

  // const handleComment = (comment: IAddNewCommentDto) => {
  //   addNewComment(comment);
  // getPostList({ id_user: userInfo.id });
  // };

  // const defaultValue = {
  //   handleLikePost,
  //   handleDislikeAPost,
  //   handleComment,
  //   userInfo,
  // };

  // useEffect(() => {
  //   if (isSuccess) {
  //     const { data: res } = data?.result;
  //     const convertedData = mapPostListBEToPostListUI(res);
  //     setPostList(convertedData);
  //   }
  // }, [data, isSuccess]);

  return (
    // <PostListContext.Provider value={{ ...defaultValue }}>
    //   <div className={styles.recommendLayout}>
    //     <p className={styles.recommendTitle}>
    //       There are recommend posts for you
    //     </p>
    //     {postList?.map((post) => {
    //       return (
    //         <React.Fragment key={post.id}>
    //           <Post post={post} />
    //         </React.Fragment>
    //       );
    //     })}
    //   </div>
    // </PostListContext.Provider>
    <p>rec</p>
  );
}

export default RecommendLayout;
