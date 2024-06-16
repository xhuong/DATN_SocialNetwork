import { Module } from "@nestjs/common";
import { FollowerService } from "./follower.service";
import { FollowerController } from "./follower.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
  controllers: [FollowerController],
  providers: [FollowerService],
  imports: [PrismaModule],
})
export class FollowerModule {}
