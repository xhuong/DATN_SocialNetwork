import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IAuthorBE {
  id: number;
  name: string;
}

interface IAuthorType {
  status: number;
  message: string;
  result: {
    data: IAuthorBE[];
    status: number;
  };
}

export const AuthorAPI = createApi({
  reducerPath: "AuthorAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getListAuthors: builder.query<IAuthorType, null>({
      query: () => "/author",
    }),
  }),
});

export const { useGetListAuthorsQuery } = AuthorAPI;
