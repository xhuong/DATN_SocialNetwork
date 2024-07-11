import { Module } from "@nestjs/common";
import { RecommendService } from "./recommend.service";
import { RecommendController } from "./recommend.controller";
import { HttpModule } from "@nestjs/axios";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  imports: [HttpModule],
  controllers: [RecommendController],
  providers: [RecommendService, PrismaService],
})
export class RecommendModule {}
