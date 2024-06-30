import { Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Response } from "express";
import { buildNestedComments } from "src/utils";
import { GetPostsDto } from "./dto/get-posts.dto";
import { userInfo } from "os";

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

  // ---  get all posts that current user was liked ---

  // give the current_user_id for this api
  // get all posts that user liked
  async getAllPostsUserLiked(idUser: number, res: Response) {
    try {
      const likedPosts = await this.prisma.post.findMany({
        where: {
          Like: {
            some: {
              user_id: {
                equals: idUser,
              },
            },
          },
        },
        include: {
          Like: true,
        },
      });

      const clonePost = likedPosts.map((post) => ({
        ...post,
        isLiked: post.Like.some((like) => like.user_id === idUser),
      }));

      return res.status(200).json({
        status: 200,
        message: "Get all liked posts successfully",
        result: {
          data: clonePost,
        },
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  }

  // ---  get all posts that current user was liked ---

  // give the current_user_id for this api
  // get all post that current user id not liked yet
  // not get the post of blocked user => feature

  async getAllPostsUserNotLiked(idUser: number, res: Response) {
    try {
      const notLikedPosts = await this.prisma.post.findMany({
        where: {
          Like: {
            every: {
              user_id: {
                not: idUser,
              },
            },
          },
        },
        include: {
          Like: true,
        },
      });

      // const clonePost = likedPosts.map((post) => ({
      //   ...post,
      //   isLiked: post.Like.some((like) => like.user_id === idUser),
      // }));

      return res.status(200).json({
        status: 200,
        message: "Get all posts that user not liked yet successfully",
        result: {
          data: notLikedPosts,
        },
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  }

  // ---  get posts of users that current user followed them ---

  // give the current_user_id for this api
  // find all user that current user is followed => ids
  // get all posts of user list from ids => return

  async getPostsByUserId(getPostDto: GetPostsDto, res: Response) {
    try {
      const followedUserIds = await this.prisma.follower.findMany({
        where: {
          follower_id: getPostDto.id_user,
        },
        select: {
          user_id: true,
        },
      });

      const ids = followedUserIds.map((obj) => obj.user_id);

      const selectUser = {
        id: true,
        name: true,
        address: true,
        image_profile: true,
      };

      const posts = await this.prisma.post.findMany({
        where: {
          user_id: {
            in: [...ids, getPostDto.id_user],
          },
        },
        orderBy: { created_date: "desc" },
        include: {
          user: {
            select: selectUser,
          },
          Comment: {
            include: {
              user: {
                select: selectUser,
              },
            },
          },
          Images: true,
          Like: {
            include: {
              user: {
                select: selectUser,
              },
            },
          },
        },
      });

      const clonePosts = posts.map((post) => ({
        ...post,
        isLiked: post?.Like.some((like) => like.user_id === getPostDto.id_user),
      }));

      return res.status(200).json({
        status: 200,
        message: `Get all posts with userId = ${getPostDto.id_user} successfully`,
        result: {
          data: clonePosts,
        },
      });
    } catch {
      return {
        status: 400,
        message: `Get all posts with userId = ${getPostDto.id_user} failed`,
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
