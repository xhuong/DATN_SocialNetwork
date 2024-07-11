import { Response } from "express";
import { Injectable } from "@nestjs/common";

import { CreateFollowerDto } from "./dto/create-follower.dto";
import { UnfollowUserDto } from "./dto/unfollow-user.dto";

import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class FollowerService {
  constructor(private prisma: PrismaService) {}
  async followUser(createFollowerDto: CreateFollowerDto, response: Response) {
    try {
      // check the user is following target user or not?
      const followedUser = await this.prisma.follower.findFirst({
        where: {
          user_id: createFollowerDto.user_id,
          follower_id: createFollowerDto.follower_id,
        },
        include: {
          user: true,
        },
      });

      if (followedUser) {
        return response.status(200).json({
          status: 200,
          message: `You have followed that user.`,
          result: {
            data: null,
          },
        });
      }

      const data = await this.prisma.follower.create({
        data: createFollowerDto,
        include: {
          follower: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return response.status(200).json({
        status: 200,
        message: `Followed user ${data.follower.name} successfully.`,
        result: {
          data: {
            isFollowed: true,
          },
        },
      });
    } catch (error) {
      return {
        status: 400,
        message: "Follow user failed!",
      };
    }
  }

  async findAllFollowingUsers(user_id: number, response: Response) {
    try {
      const data = await this.prisma.follower.findMany({
        where: {
          user_id,
        },
        include: {
          follower: {
            select: {
              id: true,
              name: true,
              address: true,
              image_profile: true,
            },
          },
        },
      });

      const cloneRes = data.map((item) => ({
        id: item.follower.id,
        name: item.follower.name,
        image_profile: item.follower.image_profile,
      }));

      return response.status(200).json({
        status: 200,
        message: `Get list followers successfully`,
        result: {
          data: cloneRes,
        },
      });
    } catch (error) {
      return {
        status: 400,
        message: "Get list followers failed!",
      };
    }
  }

  async getAllNotFollowingUsers(user_id: number, response: Response) {
    try {
      // lay ra tat ca nhung nguoi ma minh da follow
      // duyet qua bang user va loai tru nhung nguoi nay
      // sau do lay toi da 10 nguoi trong ket qua tra ve

      const followedUsers = await this.prisma.follower.findMany({
        where: {
          follower_id: user_id,
        },
      });

      const ids = followedUsers.map((followedUser) => followedUser.user_id);

      // followedUsers[0].user_id la user_id cua nhung nguoi minh dang follow

      const allUsers = await this.prisma.user.findMany({
        where: {
          id: {
            notIn: [...ids, user_id],
          },
        },
        select: {
          id: true,
          name: true,
          address: true,
          image_profile: true,
        },
      });

      return response.status(200).json({
        status: 200,
        message: `Get list not following users successfully.`,
        result: {
          data: allUsers,
        },
      });
    } catch (error) {
      return {
        status: 400,
        message: "Get list not following users failed!",
      };
    }
  }

  async unFollowUser(unfollowUserDto: UnfollowUserDto, response: Response) {
    try {
      console.log("unFollowUser", unfollowUserDto);

      // check the user is following target user or not?
      const followedUser = await this.prisma.follower.findFirst({
        where: {
          user_id: unfollowUserDto.user_id,
          follower_id: unfollowUserDto.follower_id,
        },
        include: {
          user: true,
        },
      });

      if (!followedUser) {
        return response.status(200).json({
          status: 200,
          message: `You have not follow that user yet.`,
          result: {
            data: null,
          },
        });
      }

      await this.prisma.follower.deleteMany({
        where: {
          user_id: {
            equals: unfollowUserDto.user_id,
          },
          follower_id: {
            equals: unfollowUserDto.follower_id,
          },
        },
      });

      return response.status(200).json({
        status: 200,
        message: `Unfollow user successfully.`,
        result: {
          data: {
            isFollowed: false,
          },
        },
      });
    } catch (error) {
      return {
        status: 400,
        message: "Unfollow user failed!",
      };
    }
  }
}
