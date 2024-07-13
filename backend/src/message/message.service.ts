import { Injectable } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { Response } from "express";
import { PrismaService } from "src/prisma/prisma.service";
import { GetMessageDto } from "./dto/get-message.dto";

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async saveMessage(createMessageDto: CreateMessageDto, res: Response) {
    try {
      const { message_text, received_user_id, send_datetime, send_user_id } =
        createMessageDto;
      const ids = [send_user_id, received_user_id];

      // find conversation first
      const conversationId = await this.prisma.conversation
        .findFirst({
          where: {
            first_user_id: {
              in: ids,
            },
            second_user_id: {
              in: ids,
            },
          },
        })
        .then((res) => res.id);

      const data = await this.prisma.message.create({
        data: {
          message_text,
          send_datetime,
          conversation_id: conversationId,
          send_user_id,
        },
      });

      return res.status(200).json({
        status: 200,
        message: "Sent message successfully.",
        result: {
          data,
        },
      });
    } catch (error) {
      return {
        status: 400,
        message: `Error when sent your message!, ${error}`,
      };
    }
  }

  async getMessages(getMessageDto: GetMessageDto, res: Response) {
    try {
      // find conversation first
      const { sender_user_id, second_user_id } = getMessageDto;
      const ids = [sender_user_id, second_user_id];
      const conversationId = await this.prisma.conversation
        .findFirst({
          where: {
            first_user_id: {
              in: ids,
            },
            second_user_id: {
              in: ids,
            },
          },
        })
        .then((res) => res.id);

      console.log("conversationId", conversationId);

      const data = await this.prisma.message.findMany({
        where: {
          conversation_id: conversationId,
        },
      });

      const cloneRes = data.map((message) => ({
        ...message,
        is_own_message: message.send_user_id === sender_user_id,
      }));

      // console.log("🚀 ~ MessageService ~ cloneRes ~ cloneRes:", cloneRes);

      return res.status(200).json({
        status: 200,
        message: "Get all messages successfully.",
        result: {
          data: cloneRes,
        },
      });
    } catch (error) {
      return {
        status: 400,
        message: `Error when get all messages: ${error}`,
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
