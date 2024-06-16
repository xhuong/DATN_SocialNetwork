interface IMessageResponseType {
  status: number;
  message: string;
  result: {
    data: IReceviedMessageBE;
    status: number;
  };
}

interface IMessageResponseTypes {
  status: number;
  message: string;
  result: {
    data: IReceviedMessageBE;
    status: number;
  };
}

export interface IMessagesResponseTypes {
  status: number;
  message: string;
  result: {
    data: IReceviedMessageBE[];
    status: number;
  };
}

interface IReceviedMessageBE {
  id: number;
  send_user_id: number;
  message_text: string;
  send_datetime: string;
  conversation_id: number;
  is_own_message: boolean;
}

export interface IReceviedMessageFE {
  id: number;
  sendUserId: number;
  messageText: string;
  sendDatetime: string;
  conversationId: number;
  isOwnMessage: boolean;
}

interface IPayloadChat {
  send_user_id: number;
  message_text: string;
  send_datetime: string;
  conversation_id: number;
}

export type {
  IMessageResponseType,
  IPayloadChat,
  IReceviedMessageBE,
  IMessageResponseTypes,
};

export const mapMessagesBEToMessageFE = (
  messages: IReceviedMessageBE[]
): IReceviedMessageFE[] => {
  return messages.map((mgs) => ({
    id: mgs.id,
    sendUserId: mgs.send_user_id,
    messageText: mgs.message_text,
    sendDatetime: mgs.send_datetime,
    conversationId: mgs.conversation_id,
    isOwnMessage: mgs.is_own_message,
  }));
};
