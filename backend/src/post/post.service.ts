import { Injectable } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Response } from "express";
import { GetPostsDto } from "./dto/get-posts.dto";
import { EsavePostType, SavePostDto } from "./dto/save-post.dto";

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

  async savePost(savePostDto: SavePostDto, response: Response) {
    const { post_id, user_id, type } = savePostDto;

    switch (type) {
      case EsavePostType.SAVE:
        try {
          const isSavedPostYet = await this.prisma.savedPost.findFirst({
            where: {
              post_id: post_id,
              user_id: user_id,
            },
          });
          if (!!!isSavedPostYet?.id) {
            const data = await this.prisma.savedPost.create({
              data: {
                post_id,
                user_id,
              },
            });
            if (data) {
              return response.status(200).json({
                status: 200,
                message: "You have saved post successfully.",
                result: {
                  data: true,
                },
              });
            }
          } else {
            return response.status(200).json({
              status: 200,
              message: "You have saved that post yet.",
              result: {
                data: true,
              },
            });
          }
        } catch (error) {
          return response.status(400).json({
            status: 400,
            message: error,
          });
        }
        break;
      case EsavePostType.UNSAVE:
        try {
          await this.prisma.savedPost.deleteMany({
            where: {
              post_id,
              user_id,
            },
          });
          return response.status(200).json({
            status: 200,
            message: "You have unsaved that post successfully",
            result: {
              data: true,
            },
          });
        } catch (error) {
          return response.status(400).json({
            status: 400,
            message: error,
          });
        }
        break;
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

  async getLatestLikedPost(id_user: number, response: Response) {
    try {
      const posts = await this.prisma.post.findFirst({
        where: {
          Like: {
            some: {
              user_id: id_user,
            },
          },
        },
        orderBy: { created_date: "desc" },
        select: { id: true, title: true },
      });

      return response.status(200).json({
        status: 200,
        message: "Get latest liked post successfully",
        result: {
          data: posts ?? [],
        },
      });
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

  // async getPostsByUserId(getPostDto: GetPostsDto, res: Response) {
  //   try {
  //     // lấy danh sách id những người mà tôi đã follow
  //     const followedUserIds = await this.prisma.follower.findMany({
  //       where: {
  //         follower_id: getPostDto.id_user,
  //       },
  //       select: {
  //         user_id: true,
  //       },
  //     });

  //     const ids = followedUserIds.map((obj) => obj.user_id);

  //     const selectUser = {
  //       id: true,
  //       name: true,
  //       address: true,
  //       image_profile: true,
  //     };

  //     // lấy những bài post của tôi và của những người mà tôi đã follow
  //     const posts = await this.prisma.post.findMany({
  //       where: {
  //         user_id: {
  //           in: [...ids, getPostDto.id_user],
  //         },
  //       },
  //       orderBy: { created_date: "desc" },
  //       include: {
  //         user: {
  //           select: selectUser,
  //         },
  //         Comment: {
  //           include: {
  //             user: {
  //               select: selectUser,
  //             },
  //           },
  //         },
  //         Images: true,
  //         Like: {
  //           include: {
  //             user: {
  //               select: selectUser,
  //             },
  //           },
  //         },
  //       },
  //     });

  //     // kiểm tra xem tôi đã like bài viết đó hay chưa
  //     const clonePosts = posts.map((post) => ({
  //       ...post,
  //       isLiked: post?.Like.some((like) => like.user_id === getPostDto.id_user),
  //     }));

  //     return res.status(200).json({
  //       status: 200,
  //       message: `Get all posts with userId = ${getPostDto.id_user} successfully`,
  //       result: {
  //         data: clonePosts,
  //       },
  //     });
  //   } catch {
  //     return {
  //       status: 400,
  //       message: `Get all posts with userId = ${getPostDto.id_user} failed`,
  //     };
  //   }
  // }

  async getPostsByUserId(getPostDto: GetPostsDto, res: Response) {
    try {
      let posts = [];
      const { id_user, id_user_viewing, is_includes_posts_of_following_users } =
        getPostDto;

      const selectUser = {
        id: true,
        name: true,
        address: true,
        image_profile: true,
      };

      // khi bạn đang xem bài post của người khác (khi xem trang profile của họ)
      // chỉ hiển thị những bài post của người đó
      if (id_user_viewing !== id_user) {
        // nếu bạn muốn xem bài post của những người mà người đó đang follow
        // lấy tất cả id của những người mà người đó đang follow
        let ids: number[] = [];
        if (is_includes_posts_of_following_users) {
          ids = await this.prisma.follower
            .findMany({
              where: {
                follower_id: id_user,
              },
              select: {
                user_id: true,
              },
            })
            .then((followingUsers) =>
              followingUsers.map((user) => user.user_id),
            );
        }

        const data = await this.prisma.post.findMany({
          where: {
            user_id: {
              in: [...ids, id_user],
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
            SavedPost: true,
          },
        });
        posts = data;
      }
      // bạn đang xem bài post của chính mình
      else if (id_user_viewing === id_user) {
        // lấy tất cả id của những người mà tôi đã follow
        let ids: number[] = [];
        // nếu bạn muốn xem bài post của những người mà bạn đang follow
        if (is_includes_posts_of_following_users) {
          ids = await this.prisma.follower
            .findMany({
              where: {
                follower_id: id_user,
              },
              select: {
                user_id: true,
              },
            })
            .then((followingUsers) =>
              followingUsers.map((user) => user.user_id),
            );
        }

        // lấy những bài post của tôi và của những người mà tôi đã follow
        const data = await this.prisma.post.findMany({
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
            SavedPost: true,
          },
        });
        posts = data;
      }

      // kiểm tra xem tôi đã like, save bài viết đó hay chưa
      const clonePosts = posts.map(({ SavedPost, ...post }) => ({
        ...post,
        isLiked: post?.Like.some(
          (like: any) => like.user_id === id_user_viewing,
        ),
        isSavedPost: SavedPost.some(
          (user: any) => user.user_id === id_user_viewing,
        ),
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

  async getSavedPostsByUserId(user_id: number, res: Response) {
    try {
      const selectUser = {
        id: true,
        name: true,
        address: true,
        image_profile: true,
      };

      const posts = await this.prisma.post.findMany({
        where: {
          SavedPost: {
            some: {
              user_id: {
                equals: user_id,
              },
            },
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
          SavedPost: true,
        },
      });

      const clonePosts = [...posts].map(({ SavedPost, ...post }) => ({
        ...post,
        isLiked: post.Like.some((like) => like.user_id === user_id),
        isSavedPost: true,
      }));

      return res.status(200).json({
        status: 200,
        message: `Get saved posts with userId = ${user_id} successfully`,
        result: {
          data: clonePosts,
        },
      });
    } catch (error) {
      return {
        status: 400,
        message: `Get saved posts with userId = ${user_id} failed`,
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
