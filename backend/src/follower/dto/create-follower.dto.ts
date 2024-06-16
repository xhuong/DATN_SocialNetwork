import { IsDateString, IsNumber } from "class-validator";

export class CreateFollowerDto {
  @IsNumber()
  user_id: number;

  @IsNumber()
  follower_id: number;
}
