import { Injectable } from "@nestjs/common";
import { CreateLikeDto } from "./dto/create-like.dto";
import { UpdateLikeDto } from "./dto/update-like.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Response } from "express";

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}
  async create(createLikeDto: CreateLikeDto, response: Response) {
    const { post_id, user_id } = createLikeDto;
    try {
      let data = {};
      const likeData = await this.prisma.like.findFirst({
        where: {
          post_id,
          user_id,
        },
      });

      if (likeData?.hasOwnProperty("post_id")) {
        data = JSON.parse(JSON.stringify(likeData));
      } else {
        data = await this.prisma.like.create({
          data: createLikeDto,
        });
      }

      return response.status(200).json({
        status: 200,
        message: `user ${user_id} liked ${post_id} successfully`,
        result: {
          data,
        },
      });
    } catch (error) {
      return {
        status: 400,
        message: `user ${user_id} liked ${post_id} failed`,
      };
    }
  }

  async dislike(dislikeDto: CreateLikeDto, response: Response) {
    const { post_id, user_id } = dislikeDto;
    try {
      const data = await this.prisma.like.deleteMany({
        where: {
          post_id: {
            equals: post_id,
          },
          user_id: {
            equals: user_id,
          },
        },
      });

      return response.status(200).json({
        status: 200,
        message: `user ${user_id} liked ${post_id} successfully`,
        result: {
          data,
        },
      });
    } catch (error) {
      return {
        status: 400,
        message: `user ${user_id} liked ${post_id} failed`,
      };
    }
  }

  findAll() {
    return `This action returns all like`;
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number, updateLikeDto: UpdateLikeDto) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
