import { IsNumber } from "class-validator";

export class CreateLikeDto {
  @IsNumber()
  post_id: number;

  @IsNumber()
  user_id: number;
}
