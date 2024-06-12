import { IPostBE } from "@/utils/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IPostsTypes {
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
}

export interface IPayloadCreatePostsDto {
  title: string;
  user_id: number;
}

const prefix = "/post";

export const PostAPI = createApi({
  reducerPath: "PostAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getPostListByUserId: builder.query<IPostsTypes, IPayloadGetPostsDto>({
      query: (payload) => {
        console.log("payload", payload);
        return {
          url: `${prefix}/get-posts-by-user-id`,
          method: "POST",
          body: payload,
        };
      },
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

export const {
  useGetPostListByUserIdQuery,
  useLazyGetPostListByUserIdQuery,
  useLazyCreatePostQuery,
} = PostAPI;
