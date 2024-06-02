import { IBookBE } from "@/utils/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IBookRecommendTypes {
  status: number;
  message: string;
  result: {
    data: IBookBE[];
    status: number;
  };
}

export const RecommendBookAPI = createApi({
  reducerPath: "RecommendBookAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_RECOMMEND_URL }),
  endpoints: (builder) => ({
    getRecommendBooks: builder.query<
      IBookRecommendTypes,
      { book_name: string }
    >({
      query: (book_name) => `/recommend?book_name=${book_name}`,
    }),
  }),
});

export const { useGetRecommendBooksQuery } = RecommendBookAPI;
