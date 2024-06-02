import { Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Response } from "express";

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(CreatePostDto: CreatePostDto, response: Response) {
    try {
      const data = await this.prisma.post.create({
        data: CreatePostDto,
      });
      return response.status(200).json({
        status: 200,
        message: "Create new post successfully",
        result: {
          data,
        },
      });
    } catch (error) {
      return {
        status: 400,
        message: "Create a new post failed",
      };
    }
  }

  async findAll(response: Response) {
    try {
      const posts = await this.prisma.post.findMany();
      if (posts) {
        return response.status(200).json({
          status: 200,
          message: "Get all posts successfully",
          result: {
            data: posts,
          },
        });
      }
    } catch (error) {
      return response.status(400).json({
        status: 400,
        message: error,
      });
    }
  }

  async findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  async getPostsByUserId(id: number, response: Response) {
    try {
      const data = await this.prisma.post.findMany({
        where: {
          user_id: id,
        },
        include: {
          Comment: true,
          Images: true,
          Like: {
            include: {
              user: true,
            },
          },
        },
      });
      return response.status(200).json({
        status: 200,
        message: `Get all posts with userId = ${id} successfully`,
        result: {
          data,
        },
      });
    } catch {
      return {
        status: 400,
        message: `Get all posts with userId = ${id} failed`,
      };
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto, response: Response) {
    try {
      const data = await this.prisma.post.update({
        where: { id },
        data: updatePostDto,
      });

      return response.status(200).json({
        status: 200,
        message: `Update post with id ${id} successfully`,
        result: {
          data,
        },
      });
    } catch {
      return {
        status: 400,
        message: `Update post with id ${id} failed`,
      };
    }
  }

  async remove(id: number, response: Response) {
    try {
      await this.prisma.post.delete({ where: { id } });
      return response.status(200).json({
        status: 200,
        message: `Delete post with id ${id} successfully`,
      });
    } catch {
      return {
        status: 400,
        message: `Delete post with id ${id} failed`,
      };
    }
  }
}
