import {
  IFollowUserPayload,
  IFollowUserResponseType,
  IOnFollowUserResponseType,
} from "@/utils/follow";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "/follower";

export const FollowAPI = createApi({
  reducerPath: "FollowAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getNotFollowingUser: builder.query<IFollowUserResponseType, { id: number }>(
      {
        query: ({ id }) => {
          return {
            url: `${BASE_URL}/get-not-following-users/${id}`,
          };
        },
      }
    ),
    getFollowerUsers: builder.query<IFollowUserResponseType, { id: number }>({
      query: ({ id }) => {
        return {
          url: `${BASE_URL}/get-follower-users/${id}`,
        };
      },
    }),
    getFollowingUsers: builder.query<IFollowUserResponseType, { id: number }>({
      query: ({ id }) => {
        return {
          url: `${BASE_URL}/get-following-users/${id}`,
        };
      },
    }),
    followUser: builder.query<IOnFollowUserResponseType, IFollowUserPayload>({
      query: (payload) => {
        return {
          url: BASE_URL,
          body: payload,
          method: "POST",
        };
      },
      transformResponse: (res: any) => res.result.data,
    }),
    unfollowUser: builder.query<IOnFollowUserResponseType, IFollowUserPayload>({
      query: (payload) => {
        return {
          url: `${BASE_URL}/unfollow-user`,
          body: payload,
          method: "DELETE",
        };
      },
      transformResponse: (res: any) => res.result.data,
    }),
    checkFollowedUser: builder.query<
      IOnFollowUserResponseType,
      IFollowUserPayload
    >({
      query: (payload) => ({
        url: `${BASE_URL}/check-followed-user`,
        body: payload,
        method: "POST",
      }),
      transformResponse: (res: any) => res.result.data,
    }),
  }),
});

export const {
  useLazyGetFollowerUsersQuery,
  useGetFollowerUsersQuery,
  useLazyGetNotFollowingUserQuery,
  useLazyFollowUserQuery,
  useLazyUnfollowUserQuery,
  useLazyGetFollowingUsersQuery,
  useCheckFollowedUserQuery,
  useLazyCheckFollowedUserQuery,
} = FollowAPI;
