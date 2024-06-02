import { Controller, Post, Body } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post("/SendOtp")
  async sendOtp(@Body() data: { phone: string }) {
    let prefix = "+84";
    let phone = prefix.concat(data.phone);
    return await this.appService.sendOtp(phone);
  }

  @Post("/VerifyOtp")
  async verifyOtp(@Body() data: { phone: string; otp: string }) {
    const prefix = "+84";
    const phone = prefix.concat(data.phone);
    return await this.appService.verifyOtp(phone, data.otp);
  }
}
