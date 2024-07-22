import { IsEnum, IsNumber } from "class-validator";

export enum ELikeType {
  LIKE = "like",
  DISLIKE = "dislike",
}

export class CreateLikeDto {
  @IsNumber()
  post_id: number;

  @IsNumber()
  user_id: number;

  @IsEnum(ELikeType)
  type: ELikeType;
}
