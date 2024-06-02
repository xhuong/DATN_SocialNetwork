import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Response } from "express";
import { PrismaService } from "src/prisma/prisma.service";

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

  // async getServicesAndPrescriptionOfMedicalExaminationByPatientById(
  //   idUser: number,
  //   response: Response,
  // ) {
  //   try {
  //     const data = await this.prisma.medicalRecord.findFirst({
  //       where: {
  //         id_patient: idUser,
  //       },
  //       include: {
  //         patient: true,
  //         MedicalExamination: {
  //           include: {
  //             ServiceRelMedicalExamination: {
  //               include: {
  //                 service: true,
  //               },
  //             },
  //             Prescription: {
  //               include: {
  //                 PrescriptionRelMedical: {
  //                   include: {
  //                     medical: true,
  //                   },
  //                 },
  //               },
  //             },
  //           },
  //         },
  //       },
  //     });
  //     if (!Object.is(data, null)) {
  //       return response.status(200).json({
  //         status: 200,
  //         message: `view history medical examination of user ${data.patient.id_user} successfully`,
  //         result: {
  //           data,
  //         },
  //       });
  //     } else {
  //       return response.status(200).json({
  //         status: 200,
  //         message: `The patient with id = ${idUser} not found`,
  //       });
  //     }
  //   } catch (error) {
  //     return response.status(400).json({
  //       status: 400,
  //       message: error,
  //     });
  //   }
  // }
}
