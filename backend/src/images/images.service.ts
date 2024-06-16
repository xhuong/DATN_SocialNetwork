import { Injectable } from "@nestjs/common";
import { CreateImageDto } from "./dto/create-image.dto";
import { UpdateImageDto } from "./dto/update-image.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Response } from "express";

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  async create(createImageDtos: CreateImageDto[], response: Response) {
    try {
      const data = await this.prisma.images.createMany({
        data: createImageDtos,
        skipDuplicates: true,
      });
      return response.status(200).json({
        status: 200,
        message: "Added image(s) to database successfully",
        result: {
          data,
        },
      });
    } catch (error) {
      return {
        status: 400,
        message: "Added image(s) to database failed",
      };
    }
  }

  findAll() {
    return `This action returns all images`;
  }

  findOne(id: number) {
    return `This action returns a #${id} image`;
  }

  update(id: number, updateImageDto: UpdateImageDto) {
    return `This action updates a #${id} image`;
  }

  remove(id: number) {
    return `This action removes a #${id} image`;
  }
}
