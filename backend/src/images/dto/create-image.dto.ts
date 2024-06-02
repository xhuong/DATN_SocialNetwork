import { IsNumber, IsString } from "class-validator";

export class CreateImageDto {
  @IsString()
  image_url: string;

  @IsNumber()
  post_id: number;
}
