import { IsString } from "class-validator";

export class UpdateAvatarDto {
  @IsString()
  image_profile: string;
}
