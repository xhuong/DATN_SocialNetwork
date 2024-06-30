import { Module } from "@nestjs/common";
import { RecommendService } from "./recommend.service";
import { RecommendController } from "./recommend.controller";
import { HttpModule } from "@nestjs/axios";

@Module({
  imports: [HttpModule],
  controllers: [RecommendController],
  providers: [RecommendService],
})
export class RecommendModule {}
