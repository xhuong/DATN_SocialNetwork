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
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Response } from "express";

@Controller("comment")
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(
    @Body() createCommentDto: CreateCommentDto,
    @Res() response: Response,
  ) {
    return this.commentService.create(createCommentDto, response);
  }

  @Get(":postId")
  getCommentsByPostId(@Param("postId") id: string, @Res() response: Response) {
    return this.commentService.getCommentsByPostId(+id, response);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Res() response: Response,
  ) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string, @Res() response: Response) {
    return this.commentService.remove(+id);
  }
}
