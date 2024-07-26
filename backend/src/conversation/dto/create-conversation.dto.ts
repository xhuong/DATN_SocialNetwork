import { IsString, IsNumber, IsDateString } from "class-validator";

export class CreateConversationDto {
  @IsString()
  name: string;

  @IsNumber()
  first_user_id: number;

  @IsNumber()
  second_user_id: number;

  @IsDateString()
  last_read_timestamp: Date;
}
