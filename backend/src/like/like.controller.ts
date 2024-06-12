import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  UseGuards,
} from "@nestjs/common";
import { LikeService } from "./like.service";
import { CreateLikeDto } from "./dto/create-like.dto";
import { UpdateLikeDto } from "./dto/update-like.dto";
import { Response } from "express";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("like")
export class LikeController {
  constructor(private readonly likeService: LikeService) {}
  // @UseGuards(AuthGuard)
  @Post()
  create(@Body() createLikeDto: CreateLikeDto, @Res() response: Response) {
    return this.likeService.create(createLikeDto, response);
  }

  @Post("/dislike")
  dislikeAPost(@Body() dislikeDto: CreateLikeDto, @Res() response: Response) {
    return this.likeService.dislike(dislikeDto, response);
  }

  @Get()
  findAll() {
    return this.likeService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.likeService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateLikeDto: UpdateLikeDto) {
    return this.likeService.update(+id, updateLikeDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.likeService.remove(+id);
  }
}
