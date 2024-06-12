import { IsNumber } from "class-validator";

export class GetPostsDto {
  @IsNumber()
  id_user: number;

  @IsNumber()
  id_user_viewing: number;
}
