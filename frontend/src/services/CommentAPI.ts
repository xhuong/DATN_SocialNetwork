import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface ICommentType {
  status: number;
  message: string;
  result: {
    data: IAddNewCommentDto[];
    status: number;
  };
}

export interface IAddNewCommentDto {
  parent_comment_id: number | null;
  content: string;
  created_at: string;
  user_id: number;
  post_id: number;
}

export const CommentAPI = createApi({
  reducerPath: "CommentAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    addNewComment: builder.query<ICommentType, IAddNewCommentDto>({
      query: (payload) => ({
        url: "/comment",
        body: payload,
        method: "POST",
      }),
    }),
  }),
});

export const { useLazyAddNewCommentQuery } = CommentAPI;
