import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCommentDto {
  @IsNumber()
  @IsOptional()
  parent_comment_id: number | null;

  @IsString()
  content: string;

  @IsDateString()
  created_at: Date;

  @IsNumber()
  user_id: number;

  @IsNumber()
  post_id: number;
}
