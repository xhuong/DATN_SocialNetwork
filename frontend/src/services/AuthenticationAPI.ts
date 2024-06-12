import { IUserBE } from "@/utils/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IUserInfoBE
  extends Omit<IUserBE, "password" | "phone_number"> {}

export interface IAuthenticationType {
  userInfo: IUserInfoBE;
  access_token: string;
}

export interface IAuthenticationPayload {
  user_name: string;
  password: string;
}

interface IAuthorType {
  status: number;
  message: string;
  result: {
    data: IAuthenticationType;
  };
}

export const AuthenticationAPI = createApi({
  reducerPath: "AuthenticationAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    login: builder.query<IAuthorType, IAuthenticationPayload>({
      query: (payload) => ({
        url: "/auth/login",
        body: payload,
        method: "POST",
      }),
    }),
  }),
});

export const { useLazyLoginQuery } = AuthenticationAPI;
