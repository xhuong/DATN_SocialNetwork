import { IsString } from "class-validator";

export class UpdateProfileInfoDto {
  @IsString()
  name: string;

  @IsString()
  address: string;
}
