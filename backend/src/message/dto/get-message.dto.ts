import { IsNumber } from "class-validator";

export class GetMessageDto {
  @IsNumber()
  conversation_id: number;

  @IsNumber()
  sender_user_id: number;
}
