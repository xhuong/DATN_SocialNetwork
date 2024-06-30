// import { Injectable } from '@nestjs/common';
// import { CreateRecommendDto } from './dto/create-recommend.dto';
// import { UpdateRecommendDto } from './dto/update-recommend.dto';

// @Injectable()
// export class RecommendService {
//   create(createRecommendDto: CreateRecommendDto) {
//     return 'This action adds a new recommend';
//   }

//   findAll() {
//     return `This action returns all recommend`;
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} recommend`;
//   }

//   update(id: number, updateRecommendDto: UpdateRecommendDto) {
//     return `This action updates a #${id} recommend`;
//   }

//   remove(id: number) {
//     return `This action removes a #${id} recommend`;
//   }
// }

import { Injectable } from "@nestjs/common";
import { catchError, map } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { HttpService } from "@nestjs/axios";
import { GetRecommendDto } from "./dto/get-recommend.dto";
import { Response } from "express";

@Injectable()
export class RecommendService {
  constructor(private readonly httpService: HttpService) {}

  // getExternalData(): Observable<any> {
  //   const url = "https://api.example.com/data"; // Replace with your API URL

  //   return this.httpService.get(url).pipe(
  //     map((response) => response.data),
  //     catchError((error) => {
  //       console.error("Error calling external API:", error);
  //       return throwError(() => new Error("Error calling external API"));
  //     }),
  //   );
  // }

  async retreivedRecommendPosts(
    getRecommendDto: GetRecommendDto,
    res: Response,
  ): Promise<any> {
    const url = "http://127.0.0.1:5000/recommend";

    try {
      // const response = await this.httpService.get(url).toPromise();
      const data = await this.httpService
        .post(url, getRecommendDto)
        .toPromise();
      // return response.data;
      return res.status(200).json({
        statusCode: 200,
        message: "",
        data,
      });
    } catch (error) {
      // console.error("Error calling external API:", error);
      // throw new Error("Error calling external API");
      return {
        status: 400,
        message: "Retreived data from recommend api failed",
      };
    }
  }
}
