import { IUserBE } from "@/utils/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IUploadImagePayload {
  image_url: string;
  post_id: number;
}

interface IUploadImageType {
  status: number;
  message: string;
  result: {
    data: null;
  };
}

export const UploadImageAPI = createApi({
  reducerPath: "UploadImageAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    uploadImages: builder.query<IUploadImageType, IUploadImagePayload[]>({
      query: (payload) => ({
        url: "/images",
        body: payload,
        method: "POST",
      }),
    }),
  }),
});

export const { useLazyUploadImagesQuery } = UploadImageAPI;
