import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPostsTypes } from "@/services/PostAPI";

interface PostDto {
  post_id: number;
  title: string;
}

interface IPayloadGetRecommendPostDtos {
  current_id_user: number;
  liked_posts: PostDto[];
  unliked_posts: PostDto[];
}

export const RecommendAPI = createApi({
  reducerPath: "RecommendAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getRecommendPosts: builder.query<IPostsTypes, IPayloadGetRecommendPostDtos>(
      {
        query: (payload) => ({
          url: "/recommend",
          body: payload,
          method: "POST",
        }),
      }
    ),
  }),
});

export const { useGetRecommendPostsQuery, useLazyGetRecommendPostsQuery } =
  RecommendAPI;
