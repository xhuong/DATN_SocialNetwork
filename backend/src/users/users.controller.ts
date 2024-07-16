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
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { Response } from "express";
import { Role } from "src/common/roles";
import { Roles } from "src/common/roles/roles.decorator";
import { RolesGuard } from "src/common/roles/roles.guard";
import { UpdateProfileInfoDto } from "./dto/update-profile.dto";
import { UpdateAvatarDto } from "./dto/update-avatar.dto";

@Controller("user")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(Role.ADMIN)
  @Post()
  findOne(@Body("user_name") userName: string, @Res() response: Response) {
    return this.usersService.findOne(userName, response);
  }

  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(Role.ADMIN)
  @Post("create-user")
  create(@Body() createUserDto: CreateUserDto, @Res() response: Response) {
    return this.usersService.create(createUserDto, response);
  }

  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(Role.DOCTOR, Role.ADMIN)
  @Get()
  findAll(@Res() response: Response) {
    return this.usersService.findAll(response);
  }

  @Get("find-users-by-name/:name")
  findUsersByName(@Param("name") name: string, @Res() response: Response) {
    return this.usersService.findUsersByName(name, response);
  }

  @Get("get-profile-info/:id")
  getProfileInfo(@Param("id") id: string, @Res() response: Response) {
    return this.usersService.getProfileInfo(+id, response);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() response: Response,
  ) {
    return this.usersService.update(+id, updateUserDto, response);
  }

  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(Role.ADMIN)
  @Delete(":id")
  remove(@Param("id") id: string, @Res() response: Response) {
    return this.usersService.remove(+id, response);
  }

  @Patch("/update-profile-info/:id")
  updateProfileInfoDto(
    @Param("id") id: string,
    @Body() updateProfileInfoDto: UpdateProfileInfoDto,
    @Res() response: Response,
  ) {
    return this.usersService.updateProfileInfo(
      +id,
      updateProfileInfoDto,
      response,
    );
  }

  @Patch("/update-avatar/:id")
  updateAvatar(
    @Param("id") id: string,
    @Body() updateProfileInfoDto: UpdateAvatarDto,
    @Res() response: Response,
  ) {
    return this.usersService.updateAvatar(+id, updateProfileInfoDto, response);
  }
}
