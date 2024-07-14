import { IsBoolean, IsNumber } from "class-validator";

export class GetPostsDto {
  @IsNumber()
  id_user: number;

  @IsNumber()
  id_user_viewing: number;

  @IsBoolean()
  is_includes_posts_of_following_users: boolean;
}
