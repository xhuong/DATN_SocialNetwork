import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export enum ERoleType {
  ADMIN = "ADMIN",
  USER = "USER",
}

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(ERoleType, { message: "Invalid role value" })
  value: ERoleType;
}
