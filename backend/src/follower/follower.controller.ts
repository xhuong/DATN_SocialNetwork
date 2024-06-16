import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
} from "@nestjs/common";
import { FollowerService } from "./follower.service";
import { CreateFollowerDto } from "./dto/create-follower.dto";
import { Response } from "express";
import { UnfollowUserDto } from "./dto/unfollow-user.dto";

@Controller("follower")
export class FollowerController {
  constructor(private readonly followerService: FollowerService) {}

  @Post()
  create(
    @Body() createFollowerDto: CreateFollowerDto,
    @Res() response: Response,
  ) {
    return this.followerService.followUser(createFollowerDto, response);
  }

  @Get("get-follower-users/:id")
  findAllFollowingUsers(@Param("id") id: string, @Res() response: Response) {
    return this.followerService.findAllFollowingUsers(+id, response);
  }

  @Get("get-not-following-users/:id")
  getAllNotFollowingUsers(@Param("id") id: string, @Res() response: Response) {
    return this.followerService.getAllNotFollowingUsers(+id, response);
  }

  @Delete("unfollow-user")
  unfollowUser(
    @Body() unFollowUserDto: UnfollowUserDto,
    @Res() response: Response,
  ) {
    return this.followerService.unFollowUser(unFollowUserDto, response);
  }
}
