import {
  IConversationResponseType,
  IMessageResponseType,
  IMessageResponseTypes,
  IMessagesResponseTypes,
  IPayloadChat,
  IPayloadConversation,
} from "@/utils/chat";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "/chat";

export const ChatAPI = createApi({
  reducerPath: "ChatAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    saveMessage: builder.query<IMessageResponseType, IPayloadChat>({
      query: (payload) => {
        console.log("payload", payload);
        return {
          url: BASE_URL,
          body: payload,
          method: "POST",
        };
      },
    }),
    getAllMessageFromConversation: builder.query<
      IMessagesResponseTypes,
      { sender_user_id: number; second_user_id: number }
    >({
      query: (payload) => ({
        url: `${BASE_URL}/get-messages`,
        body: payload,
        method: "POST",
      }),
    }),
    createConversation: builder.query<
      IConversationResponseType,
      IPayloadConversation
    >({
      query: (body) => ({
        url: "conversation",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLazySaveMessageQuery,
  useLazyGetAllMessageFromConversationQuery,
  useGetAllMessageFromConversationQuery,
  useLazyCreateConversationQuery,
} = ChatAPI;
