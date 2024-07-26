import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from "@nestjs/common";
import { ConversationService } from "./conversation.service";
import { CreateConversationDto } from "./dto/create-conversation.dto";
import { UpdateConversationDto } from "./dto/update-conversation.dto";
import { Response } from "express";

@Controller("conversation")
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Post()
  create(
    @Body() createConversationDto: CreateConversationDto,
    @Res() response: Response,
  ) {
    return this.conversationService.create(createConversationDto, response);
  }

  @Get()
  findAll() {
    return this.conversationService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.conversationService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateConversationDto: UpdateConversationDto,
  ) {
    return this.conversationService.update(+id, updateConversationDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.conversationService.remove(+id);
  }
}
