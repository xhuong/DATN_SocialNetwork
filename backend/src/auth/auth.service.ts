import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  roles = ["ADMIN", "CUSTOMER"];

  async signIn(userName: string, password: string) {
    try {
      const data = await this.prisma.user.findFirst({
        where: { user_name: userName },
      });
      if (!data) {
        return {
          message: "Signed in failed, please check your user name or password",
        };
      }
      if (data) {
        if (data.password === password) {
          const payload = {
            sub: password,
            user_name: userName,
            role: this.roles[data.role_id - 1],
          };
          return {
            message: "Signed in successfully",
            data: {
              access_token: await this.jwtService.signAsync(payload),
            },
          };
        } else {
          return {
            message: "Signed in failed, the password is incorrect",
          };
        }
      }
    } catch {
      throw UnauthorizedException;
    }
  }
}
