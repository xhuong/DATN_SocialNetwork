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
    }),
    unfollowUser: builder.query<IOnFollowUserResponseType, IFollowUserPayload>({
      query: (payload) => {
        return {
          url: BASE_URL,
          body: payload,
          method: "DELETE",
        };
      },
    }),
  }),
});

export const {
  useLazyGetFollowerUsersQuery,
  useLazyGetNotFollowingUserQuery,
  useLazyFollowUserQuery,
  useLazyUnfollowUserQuery,
  useLazyGetFollowingUsersQuery,
} = FollowAPI;
