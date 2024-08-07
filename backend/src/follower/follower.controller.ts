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
import { CheckIsFollowedUserDto } from "./dto/unfollow-user.dto copy";

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
  findAllFollowersUsers(@Param("id") id: string, @Res() response: Response) {
    return this.followerService.findAllFollowersUsers(+id, response);
  }
  @Post("check-followed-user")
  checkFollowedUser(
    @Body() checkIsFollowedUser: CreateFollowerDto,
    @Res() response: Response,
  ) {
    return this.followerService.checkFollowedUser(
      checkIsFollowedUser,
      response,
    );
  }

  @Get("get-following-users/:id")
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
