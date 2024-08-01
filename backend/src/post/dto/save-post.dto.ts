import { IsEnum, IsNumber } from "class-validator";

export enum EsavePostType {
  UNSAVE = 0,
  SAVE = 1,
}
export class SavePostDto {
  @IsNumber()
  post_id: number;

  @IsNumber()
  user_id: number;

  @IsEnum(EsavePostType)
  type: EsavePostType;
}
