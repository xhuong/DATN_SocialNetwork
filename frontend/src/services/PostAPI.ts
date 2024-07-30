import { IPostBE } from "@/utils/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IPostsTypes {
  status: number;
  message: string;
  result: {
    data: IPostBE[];
    status: number;
  };
}

export interface ICreatePostBE {
  id: number;
  title: string;
  user_id: number;
  created_date: string;
  isLiked: boolean;
  feeling?: string;
}

interface IPostTypes {
  status: number;
  message: string;
  result: {
    data: ICreatePostBE;
    status: number;
  };
}

export interface IPayloadSearchBookDto {
  name?: string;
  min_price?: number;
  max_price?: number;
  author_id?: number;
  publisher_id?: number;
}

export interface IPayloadGetPostsDto {
  id_user: number;
  id_user_viewing: number;
  is_includes_posts_of_following_users: boolean;
}

export interface IPayloadCreatePostsDto {
  title: string;
  user_id: number;
  feeling?: string;
}

const prefix = "/post";

export const PostAPI = createApi({
  reducerPath: "PostAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getPostListByUserId: builder.query<IPostsTypes, IPayloadGetPostsDto>({
      query: (payload) => {
        return {
          url: `${prefix}/get-posts-by-user-id`,
          method: "POST",
          body: payload,
        };
      },
    }),
    getLatestLikedPost: builder.query<IPostsTypes, { id: number }>({
      query: ({ id }) => {
        return {
          url: `${prefix}/get-latest-liked-post/${id}`,
        };
      },
      transformResponse: (res: any) => res.result.data,
    }),
    createPost: builder.query<IPostTypes, IPayloadCreatePostsDto>({
      query: (payload) => {
        return {
          url: prefix,
          method: "POST",
          body: payload,
        };
      },
    }),
  }),
});

export const {
  useLazyGetLatestLikedPostQuery,
  useGetPostListByUserIdQuery,
  useLazyGetPostListByUserIdQuery,
  useLazyCreatePostQuery,
} = PostAPI;
