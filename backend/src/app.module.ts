import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { DatabaseModule } from "./database/database.module";
// import { RoleModule } from "./role/role.module";
import { PrismaModule } from "./prisma/prisma.module";
// import { APP_INTERCEPTOR } from "@nestjs/core";
// import { ResponseInterceptor } from "./interceptors/response.interceptor";
import { RBACMiddleware } from "./middleware/RBACMiddleware/rbac.middleware";
import { ConfigModule } from "@nestjs/config";
// import { AuthService } from "./auth/auth.service";
import { RoleModule } from "./role/role.module";
import { ImagesModule } from "./images/images.module";
import { PostModule } from "./post/post.module";
import { LikeModule } from "./like/like.module";
import { FollowerModule } from "./follower/follower.module";
import { CommentModule } from "./comment/comment.module";

@Module({
  imports: [
    UsersModule,
    AuthModule,
    DatabaseModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RoleModule,
    ImagesModule,
    PostModule,
    LikeModule,
    FollowerModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ResponseInterceptor,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RBACMiddleware)
      .forRoutes
      // "user"
      ();
  }
}
