import { IUserResponseType } from "@/utils/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "/user";

export const UserAPI = createApi({
  reducerPath: "UserAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
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
  }),
});

export const {
  useGetProfileInfoQuery,
  useLazyGetProfileInfoQuery,
  useUpdateProfileInfoMutation,
} = UserAPI;
