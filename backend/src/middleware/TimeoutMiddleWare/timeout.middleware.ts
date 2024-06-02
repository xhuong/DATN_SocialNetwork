import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class TimeoutMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    let timeout = 5000;
    const intervalId = setInterval(() => {
      timeout -= 1000;
      if (!timeout) {
        console.log("destroyed interval");
        res.status(408).json({ statusCode: 408, message: "Request timeout" });
        clearInterval(intervalId);
        next();
      }
    }, 1000);
  }
}
