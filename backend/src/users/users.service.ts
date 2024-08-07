import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Response } from "express";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateProfileInfoDto } from "./dto/update-profile.dto";
import { UpdateAvatarDto } from "./dto/update-avatar.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto, response: Response) {
    try {
      const data = await this.prisma.user.create({
        data: createUserDto,
      });
      return response.status(200).json({
        status: 200,
        message: "Create new user successfully",
        result: {
          data,
        },
      });
    } catch (error) {
      return {
        status: 400,
        message: "Create a new user failed",
      };
    }
  }

  async findAll(response: Response) {
    try {
      const users = await this.prisma.user.findMany();
      if (users) {
        return response.status(200).json({
          status: 200,
          message: "Get all users successfully",
          result: {
            data: users,
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

  async getContactUsers(userId: number, response: Response) {
    try {
      const users = await this.prisma.user.findMany({
        select: {
          id: true,
          name: true,
          address: true,
          image_profile: true,
          role_id: true,
          followers: true,
        },
      });

      if (users) {
        const cloneUsers = [...users];
        const data = cloneUsers.map(({ followers, ...item }) => ({
          ...item,
          is_followed: followers.some((user) => user.follower_id === userId),
        }));
        return response.status(200).json({
          status: 200,
          message: "Get all users successfully",
          result: {
            data,
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

  async findUsersByName(name: string, response: Response) {
    try {
      const users = await this.prisma.user.findMany({
        where: {
          name: {
            contains: name,
          },
        },
      });
      if (users) {
        return response.status(200).json({
          status: 200,
          message: "Find users successfully",
          result: {
            data: users,
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

  async findOne(user_name: string, response: Response) {
    try {
      const data = await this.prisma.user.findFirst({
        where: { user_name: user_name },
      });
      return response.status(200).json({
        status: 200,
        message: `Get user ${user_name} successfully`,
        result: {
          data,
        },
      });
    } catch {
      return {
        status: 400,
        message: `Get user ${user_name} failed`,
      };
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto, response: Response) {
    try {
      const data = await this.prisma.user.update({
        where: { id },
        data: updateUserDto,
      });

      return response.status(200).json({
        status: 200,
        message: `Update user with id ${id} successfully`,
        result: {
          data,
        },
      });
    } catch {
      return {
        status: 400,
        message: `Update user with id ${id} failed`,
      };
    }
  }

  async remove(id: number, response: Response) {
    try {
      await this.prisma.user.delete({ where: { id } });
      return response.status(200).json({
        status: 200,
        message: `Delete user with id ${id} successfully`,
      });
    } catch {
      return {
        status: 400,
        message: `Delete user with id ${id} failed`,
      };
    }
  }

  async getProfileInfo(userId: number, response: Response) {
    try {
      const data = await this.prisma.user.findFirst({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          address: true,
          phone_number: true,
          image_profile: true,
        },
      });
      return response.status(200).json({
        status: 200,
        message: `Get userInfo with id = ${userId} successfully`,
        result: {
          data,
        },
      });
    } catch {
      return {
        status: 400,
        message: `Get userInfo with id = ${userId} failed`,
      };
    }
  }

  async updateProfileInfo(
    id: number,
    updateProfileInfo: UpdateProfileInfoDto,
    response: Response,
  ) {
    try {
      const data = await this.prisma.user.update({
        where: { id },
        data: updateProfileInfo,
      });

      return response.status(200).json({
        status: 200,
        message: `Update profile info with id ${id} successfully`,
        result: {
          data,
        },
      });
    } catch {
      return {
        status: 400,
        message: `Update profile info with id ${id} failed`,
      };
    }
  }

  async updateAvatar(
    id: number,
    updateAvatar: UpdateAvatarDto,
    response: Response,
  ) {
    try {
      const data = await this.prisma.user.update({
        where: { id },
        data: updateAvatar,
      });

      return response.status(200).json({
        status: 200,
        message: `Update avatar with id ${id} successfully`,
        result: {
          data,
        },
      });
    } catch {
      return {
        status: 400,
        message: `Update avatar with id ${id} failed`,
      };
    }
  }
}
