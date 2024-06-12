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

export const LikeAPI = createApi({
  reducerPath: "LikeAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    likeAPost: builder.query<ILikeTypes, IPayloadLikeAPostDto>({
      query: (payload) => ({
        url: "/like",
        body: payload,
        method: "POST",
      }),
    }),
    dislikeAPost: builder.mutation<ILikeTypes, IPayloadLikeAPostDto>({
      query: (payload) => ({
        url: "/like/dislike",
        body: payload,
        method: "POST",
      }),
    }),

    // getNewestBooks: builder.query<IBookTypes, null>({
    //   query: () => "/post/newest",
    // }),
    // getBookById: builder.query<IBookTypes, { id: number }>({
    //   query: ({ id }) => {
    //     return `/book/${id}`;
    //   },
    // }),
    // getListBooks: builder.query<IBookTypes, IPayloadSearchBookDto>({
    //   query: (payload) => ({
    //     url: "/book",
    //     method: "POST",
    //     body: payload ?? {},
    //   }),
    // }),
    // getListOfBooksRecommendation: builder.query({
    //   query: () => "/products/newest",
    // }),
    // getProductsByFilter: builder.query({
    //   query: (body) =>
    //     `/products/filter?idCategory=${body.idCategory}&size=${body.size}&color=${body.color}&minPrice=${body.minPrice}&maxPrice=${body.maxPrice}`,
    // }),
    // getTrendingProducts: builder.query({
    //   query: () => "/products/trending",
    // }),
    // getListProductsOrdered: builder.query({
    //   query: (body) => `/user/${body.idUser}/orders`,
    // }),
    // getProductById: builder.query({
    //   query: (body) => `/product/${body.id}`,
    // }),
    // findProductsByName: builder.query({
    //   query: (body) =>
    //     `/products/find?idCategory=${body.idCategory}&keyword=${body.keyword}`,
    // }),
    // getAllProductOrdered: builder.query({
    //   query: () => `/orders`,
    // }),
    // getAllProduct: builder.query({
    //   query: () => `/products`,
    // }),
  }),
});

export const { useLazyLikeAPostQuery, useDislikeAPostMutation } = LikeAPI;
