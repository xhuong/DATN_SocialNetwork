import {
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  user_name: string;

  @IsString()
  @MinLength(8, {
    message: "The password must be greater than or equal 8 characters",
  })
  password: string;

  @IsPhoneNumber("VN")
  phone_number: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsNumber()
  role_id: number;
}
