// rbac.middleware.ts

import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { jwtConstants } from "src/auth/constants";

@Injectable()
export class RBACMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log("RBACMiddleware is running...");
    const token = req.headers.authorization?.split(" ")[1];
    try {
      const decodedToken: any = jwt.verify(token, jwtConstants.secret);
      req["role"] = decodedToken.role;
      console.log("🚀 decodedToken:", decodedToken);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new UnauthorizedException("Token expired", "TokenExpired");
      } else {
        throw new UnauthorizedException();
      }
    }
    next();
  }
}
