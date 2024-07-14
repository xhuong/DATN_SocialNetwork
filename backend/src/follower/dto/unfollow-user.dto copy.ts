import { IsNumber } from "class-validator";

export class CheckIsFollowedUserDto {
  @IsNumber()
  current_user_id: number;

  @IsNumber()
  followed_user_id: number;
}
