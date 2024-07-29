import {
  IUserBEContactType,
  IUserBEOmitId,
  IUserResponseType,
} from "@/utils/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "/user";

export const UserAPI = createApi({
  reducerPath: "UserAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getContactUsers: builder.query<IUserBEContactType[], { userId: number }>({
      query: ({ userId }) => ({
        url: `${BASE_URL}/get-contact-users/${userId}`,
      }),
      transformResponse: (res: any) => res.result.data,
    }),
    getProfileInfo: builder.query<IUserResponseType, { userId: number }>({
      query: ({ userId }) => ({
        url: `${BASE_URL}/get-profile-info/${userId}`,
      }),
      transformResponse: (res: any) => res.result.data,
    }),
    updateProfileInfo: builder.mutation<
      void,
      { id: number; updateProfileInfoDto: { name: string; address: string } }
    >({
      query: ({ id, updateProfileInfoDto }) => ({
        url: `${BASE_URL}/update-profile-info/${id}`,
        body: updateProfileInfoDto,
        method: "PATCH",
      }),
      transformResponse: (res: any) => res.result.data,
    }),
    createNewUser: builder.mutation<IUserResponseType, IUserBEOmitId>({
      query: (payload) => ({
        url: `${BASE_URL}/create-user`,
        body: payload,
        method: "POST",
      }),
      transformResponse: (res: any) => res.result.data,
    }),
    findUsersByName: builder.query<IUserResponseType[], { name: string }>({
      query: ({ name }) => ({
        url: `${BASE_URL}/find-users-by-name/${name}`,
      }),
      transformResponse: (res: any) => res.result.data,
    }),
    updateAvatar: builder.mutation<
      void,
      { id: number; updateAvatarDto: { image_profile: string } }
    >({
      query: ({ id, updateAvatarDto }) => ({
        url: `${BASE_URL}/update-avatar/${id}`,
        body: updateAvatarDto,
        method: "PATCH",
      }),
      transformResponse: (res: any) => res.result.data,
    }),
  }),
});

export const {
  useGetProfileInfoQuery,
  useLazyGetProfileInfoQuery,
  useUpdateProfileInfoMutation,
  useUpdateAvatarMutation,
  useCreateNewUserMutation,
  useLazyFindUsersByNameQuery,
  useGetContactUsersQuery,
  useLazyGetContactUsersQuery,
} = UserAPI;
