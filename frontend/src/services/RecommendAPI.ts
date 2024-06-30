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

export interface IPayloadLikeAPostDto {
  user_id: number;
  post_id: number;
}

export const RecommendAPI = createApi({
  reducerPath: "RecommendAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    likeAPost: builder.query<ILikeTypes, IPayloadLikeAPostDto>({
      query: (payload) => ({
        url: "/",
        body: payload,
        method: "POST",
      }),
    }),
  }),
});

export const { useLazyLikeAPostQuery } = RecommendAPI;
