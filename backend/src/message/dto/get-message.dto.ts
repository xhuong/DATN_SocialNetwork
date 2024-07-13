import { IsNumber } from "class-validator";

export class GetMessageDto {
  @IsNumber()
  second_user_id: number;

  @IsNumber()
  sender_user_id: number;
}
