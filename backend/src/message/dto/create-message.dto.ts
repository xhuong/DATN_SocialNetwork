import { IsNumber, IsString, IsDateString } from "class-validator";

export class CreateMessageDto {
  @IsNumber()
  send_user_id: number;

  @IsString()
  message_text: string;

  @IsDateString()
  send_datetime: Date;

  @IsNumber()
  conversation_id: number;
}
