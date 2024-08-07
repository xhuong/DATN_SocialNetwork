import { IsNumber, IsString } from "class-validator";

export class CreatePostDto {
  @IsString()
  title: string;

  @IsNumber()
  user_id: number;
}
