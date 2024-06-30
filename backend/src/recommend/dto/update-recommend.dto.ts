import { PartialType } from "@nestjs/mapped-types";
import { GetRecommendDto } from "./get-recommend.dto";

export class UpdateRecommendDto extends PartialType(GetRecommendDto) {}
