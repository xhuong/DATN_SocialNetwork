import { Module } from "@nestjs/common";
import { ConversationService } from "./conversation.service";
import { ConversationController } from "./conversation.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  controllers: [ConversationController],
  imports: [PrismaModule],
  providers: [ConversationService],
})
export class ConversationModule {}
