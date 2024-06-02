import { PartialType } from "@nestjs/mapped-types";
import { CreatePostDto } from "./create-post.dto";
import { IsString } from "class-validator";

export class UpdatePostDto {
  @IsString()
  title: string;
}
