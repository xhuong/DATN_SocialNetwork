import { Controller, Post, Body, Res } from "@nestjs/common";
import { RecommendService } from "./recommend.service";
import { GetRecommendDto } from "./dto/get-recommend.dto";
import { Response } from "express";

@Controller("recommend")
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}

  @Post()
  getData(@Body() recommendDto: GetRecommendDto, @Res() res: Response) {
    return this.recommendService.retreivedRecommendPosts(recommendDto, res);
  }
}
