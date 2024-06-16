import { Injectable } from "@nestjs/common";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { Response } from "express";
import { PrismaService } from "src/prisma/prisma.service";
import { GetMessageDto } from "./dto/get-message.dto";

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async sentMessage(createMessageDto: CreateMessageDto, res: Response) {
    try {
      const data = await this.prisma.message.create({
        data: createMessageDto,
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
    const { conversation_id, sender_user_id } = getMessageDto;
    try {
      const data = await this.prisma.message.findMany({
        where: {
          conversation_id: conversation_id,
        },
      });

      const cloneRes = data.map((message) => ({
        ...message,
        is_own_message: message.send_user_id === sender_user_id,
      }));

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
        message: `Error when get all message with conversation id = ${conversation_id}!, ${error}`,
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
