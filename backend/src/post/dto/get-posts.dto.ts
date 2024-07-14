import { IsBoolean, IsNumber } from "class-validator";

export class GetPostsDto {
  @IsNumber()
  id_user: number;
}
