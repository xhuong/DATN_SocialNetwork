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
      const data = await this.prisma.like.create({
        data: createLikeDto,
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
