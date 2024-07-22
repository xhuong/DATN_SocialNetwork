import { ILikeBE } from "@/utils/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ILikeTypes {
  status: number;
  message: string;
  result: {
    data: ILikeBE[];
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

export enum ELikeType {
  LIKE = "like",
  DISLIKE = "dislike",
}

export interface IPayloadLikeAPostDto {
  user_id: number;
  post_id: number;
  type: ELikeType;
}

export const LikeAPI = createApi({
  reducerPath: "LikeAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    likePost: builder.query<ILikeTypes, IPayloadLikeAPostDto>({
      query: (payload) => ({
        url: "/like",
        body: payload,
        method: "POST",
      }),
    }),
    // dislikeAPost: builder.mutation<ILikeTypes, IPayloadLikeAPostDto>({
    //   query: (payload) => ({
    //     url: "/like/dislike",
    //     body: payload,
    //     method: "POST",
    //   }),
    // }),
  }),
});

export const {
  useLazyLikePostQuery,
  //  useDislikeAPostMutation
} = LikeAPI;
