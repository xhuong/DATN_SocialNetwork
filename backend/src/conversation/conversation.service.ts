import { Injectable } from "@nestjs/common";
import { CreateConversationDto } from "./dto/create-conversation.dto";
import { UpdateConversationDto } from "./dto/update-conversation.dto";
import { Response } from "express";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ConversationService {
  constructor(private prisma: PrismaService) {}
  async create(
    createConversationDto: CreateConversationDto,
    response: Response,
  ) {
    const { name, first_user_id, second_user_id, last_read_timestamp } =
      createConversationDto;
    const ids = [first_user_id, second_user_id];
    // check is exist conversation or not?
    const conversation = await this.prisma.conversation.findFirst({
      where: {
        first_user_id: {
          in: ids,
        },
        second_user_id: {
          in: ids,
        },
      },
    });

    if (conversation?.id) {
      return response.status(200).json({
        status: 200,
        message: `Conversation with firstUserId = ${first_user_id} and secondUserId = ${second_user_id} is existed!`,
        result: {
          data: conversation,
        },
      });
    } else {
      // create new
      const data = await this.prisma.conversation.create({
        data: createConversationDto,
      });
      return response.status(200).json({
        status: 200,
        message: `Created a new conversation with firstUserId = ${first_user_id} and secondUserId = ${second_user_id} successfully!`,
        result: {
          data,
        },
      });
    }
  }

  findAll() {
    return `This action returns all conversation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conversation`;
  }

  update(id: number, updateConversationDto: UpdateConversationDto) {
    return `This action updates a #${id} conversation`;
  }

  remove(id: number) {
    return `This action removes a #${id} conversation`;
  }
}
