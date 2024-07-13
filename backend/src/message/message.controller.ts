import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Query,
} from "@nestjs/common";
import { MessageService } from "./message.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { UpdateMessageDto } from "./dto/update-message.dto";
import { Response } from "express";
import { GetMessageDto } from "./dto/get-message.dto";

@Controller("chat")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  saveMessage(
    @Body() createMessageDto: CreateMessageDto,
    @Res() res: Response,
  ) {
    return this.messageService.saveMessage(createMessageDto, res);
  }

  @Post("/get-messages")
  getMessages(@Body() getMessageDto: GetMessageDto, @Res() res: Response) {
    return this.messageService.getMessages(getMessageDto, res);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.messageService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(+id, updateMessageDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.messageService.remove(+id);
  }
}
