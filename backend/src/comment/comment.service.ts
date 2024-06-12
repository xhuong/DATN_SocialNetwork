import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Response } from "express";

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  async create(createCommentDto: CreateCommentDto, response: Response) {
    try {
      const data = await this.prisma.comment.create({
        data: createCommentDto,
      });
      return response.status(200).json({
        status: 200,
        message: "Create new comment successfully",
        result: {
          data,
        },
      });
    } catch (error) {
      return {
        status: 400,
        message: "Create a new comment failed",
      };
    }
  }

  async getCommentsByPostId(postId: number, response: Response) {
    try {
      const data = await this.prisma.comment.findMany({
        where: {
          post_id: postId,
        },
      });
      return response.status(200).json({
        status: 200,
        message: `Get all comments by postId = ${postId} successfully`,
        result: {
          data,
        },
      });
    } catch (error) {
      return {
        status: 400,
        message: `Get all comments by postId = ${postId} failed`,
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
    response: Response,
  ) {
    try {
      const data = await this.prisma.comment.update({
        data: updateCommentDto,
        where: {
          id,
        },
      });
      return response.status(200).json({
        status: 200,
        message: "Update comment successfully",
        result: {
          data,
        },
      });
    } catch (error) {
      return {
        status: 400,
        message: "Update comment failed",
      };
    }
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
