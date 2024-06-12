import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { Response } from "express";
import { GetPostsDto } from "./dto/get-posts.dto";

@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() createPostDto: CreatePostDto, @Res() response: Response) {
    return this.postService.create(createPostDto, response);
  }

  @Get()
  findAll(@Res() response: Response) {
    return this.postService.findAll(response);
  }

  @Post("/get-posts-by-user-id")
  getPostsByUserId(
    @Body() getPostsDto: GetPostsDto,
    @Res() response: Response,
  ) {
    return this.postService.getPostsByUserId(getPostsDto, response);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Res() response: Response,
  ) {
    return this.postService.update(+id, updatePostDto, response);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Res() response: Response) {
    return this.postService.remove(+id, response);
  }
}
