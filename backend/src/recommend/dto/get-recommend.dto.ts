import { IsArray, IsNumber, IsString } from "class-validator";

class PostDto {
  @IsNumber()
  post_id: number;

  @IsString()
  title: string;
}

export class GetRecommendDto {
  @IsNumber()
  current_id_user: number;

  @IsArray()
  liked_posts: PostDto[];

  @IsArray()
  unliked_posts: PostDto[];
}
