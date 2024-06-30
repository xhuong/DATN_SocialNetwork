import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RecommendService } from "./recommend.service";
// import { CreateRecommendDto } from "./dto/create-recommend.dto";
import { UpdateRecommendDto } from "./dto/update-recommend.dto";
import { GetRecommendDto } from "./dto/get-recommend.dto";
import { Response } from "express";

@Controller("recommend")
export class RecommendController {
  constructor(private readonly recommendService: RecommendService) {}

  // @Post()
  // create(@Body() createRecommendDto: CreateRecommendDto) {
  //   return this.recommendService.create(createRecommendDto);
  // }

  // @Get()
  // findAll() {
  //   return this.recommendService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.recommendService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRecommendDto: UpdateRecommendDto) {
  //   return this.recommendService.update(+id, updateRecommendDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.recommendService.remove(+id);
  // }

  @Post()
  getData(@Body() recommendDto: GetRecommendDto, @Res() res: Response) {
    //   try {
    //     const data = await this.recommendService.getExternalDataAsync();
    //     return {
    //       status: 200,
    //       message: "Data retrieved successfully",
    //       result: data,
    //     };
    //   } catch (error) {
    //     return {
    //       status: 500,
    //       message: "Error retrieving data",
    //     };
    //   }
    // }

    return this.recommendService.retreivedRecommendPosts(recommendDto, res);
  }
}
