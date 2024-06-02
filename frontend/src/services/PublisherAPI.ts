import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IPublisherBE {
  id: number;
  name: string;
}

interface IPublisherType {
  status: number;
  message: string;
  result: {
    data: IPublisherBE[];
    status: number;
  };
}

export const PublisherAPI = createApi({
  reducerPath: "PublisherAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    getListPublishers: builder.query<IPublisherType, null>({
      query: () => "/publisher",
    }),
  }),
});

export const { useGetListPublishersQuery } = PublisherAPI;
