import { IsNumber } from "class-validator";

export class UnfollowUserDto {
  @IsNumber()
  user_id: number;

  @IsNumber()
  follower_id: number;
}
