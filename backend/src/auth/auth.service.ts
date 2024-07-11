import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { userInfo } from "os";
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
          status: 400,
          message: "Signed in failed, please check your user name or password",
          data: null,
        };
      }
      if (data) {
        if (data.password === password) {
          const payload = {
            sub: password,
            user_name: userName,
            role: this.roles[data.role_id - 1],
          };

          const user_info = {
            id: data?.id,
            name: data?.name,
            user_name: data?.user_name,
            address: data?.address,
            role_id: data?.role_id,
            image_profile: data?.image_profile,
          };

          return {
            status: 200,
            message: "Signed in successfully",
            result: {
              data: {
                user_info,
                access_token: await this.jwtService.signAsync(payload),
              },
            },
          };
        } else {
          return {
            status: 400,
            message: "Signed in failed, the password is incorrect",
            data: null,
          };
        }
      }
    } catch {
      throw UnauthorizedException;
    }
  }
}
