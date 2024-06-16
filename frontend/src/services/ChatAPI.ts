import {
  IMessageResponseType,
  IMessageResponseTypes,
  IMessagesResponseTypes,
  IPayloadChat,
} from "@/utils/chat";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "/chat";

export const ChatAPI = createApi({
  reducerPath: "ChatAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  endpoints: (builder) => ({
    sendMessage: builder.query<IMessageResponseType, IPayloadChat>({
      query: (payload) => ({
        url: BASE_URL,
        body: payload,
        method: "POST",
      }),
    }),
    getAllMessageFromConversation: builder.query<
      IMessagesResponseTypes,
      { conversation_id: number; sender_user_id: number }
    >({
      query: (payload) => ({
        url: `${BASE_URL}/get-messages-from-conversation-id`,
        body: payload,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLazySendMessageQuery,
  useLazyGetAllMessageFromConversationQuery,
  useGetAllMessageFromConversationQuery,
} = ChatAPI;
