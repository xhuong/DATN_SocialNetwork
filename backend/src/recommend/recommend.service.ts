import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { GetRecommendDto } from "./dto/get-recommend.dto";
import { Response } from "express";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class RecommendService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  async retreivedRecommendPosts(
    getRecommendDto: GetRecommendDto,
    res: Response,
  ): Promise<any> {
    const url = "http://127.0.0.1:5000/recommend";

    try {
      const { data } = await this.httpService
        .post(url, getRecommendDto)
        .toPromise();

      const ids = data.map((item: any) => item.post_id);

      const selectUser = {
        id: true,
        name: true,
        address: true,
        image_profile: true,
      };

      const posts = await this.prisma.post.findMany({
        where: {
          id: {
            in: ids,
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
        isLiked: post?.Like.some(
          (like) => like.user_id === getRecommendDto.current_id_user,
        ),
      }));

      return res.status(200).json({
        status: 200,
        message: "Retreived recommend posts successfully",
        result: {
          data: clonePosts,
        },
      });
    } catch (error) {
      return {
        status: 400,
        message: "Retreived data from recommend api failed",
      };
    }
  }
}
