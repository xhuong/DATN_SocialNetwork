import { Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Response } from "express";

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto, response: Response) {
    try {
      const isExitRole = await this.prisma.role.findFirst({
        where: {
          value: createRoleDto.value,
        },
      });
      if (isExitRole) {
        return response.status(201).json({
          status: 201,
          message: "Role is exites",
        });
      }
      const data = await this.prisma.role.create({ data: createRoleDto });
      return response.status(200).json({
        status: 200,
        message: "Create new role successfully",
        result: {
          data,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  async findAll(response: Response) {
    try {
      const data = await this.prisma.role.findMany();
      return response.status(200).json({
        status: 200,
        message: "Get all roles successfully",
        result: {
          data,
        },
      });
    } catch {
      return {
        status: 400,
        message: `Get all roles failed`,
      };
    }
  }

  async findOne(id: number, response: Response) {
    try {
      const data = await this.prisma.role.findUnique({
        where: { id },
      });
      return response.status(200).json({
        status: 200,
        message: `Get role with id = ${id} successfully`,
        result: {
          data,
        },
      });
    } catch (error) {
      return {
        status: 400,
        message: `Get role failed`,
      };
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto, response: Response) {
    try {
      const data = await this.prisma.role.update({
        where: { id },
        data: updateRoleDto,
      });
      return response.status(200).json({
        status: 200,
        message: `Updated role with id = ${id} successfully`,
        result: {
          data,
        },
      });
    } catch (error) {
      return {
        status: 400,
        message: `Update role failed`,
      };
    }
  }

  async remove(id: number, response: Response) {
    try {
      await this.prisma.role.delete({
        where: { id },
      });
      return response.status(200).json({
        status: 200,
        message: `Remove role with id = ${id} successfully`,
      });
    } catch (error) {
      return {
        status: 400,
        message: `Remove role failed`,
      };
    }
  }
}
