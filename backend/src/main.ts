// the first version
// import { NestFactory } from "@nestjs/core";
// import { AppModule } from "./app.module";
// import { ValidationPipe } from "@nestjs/common";
// // import { ResponseInterceptor } from "./interceptors/response.interceptor";

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.enableCors({
//     origin: "*",
//     methods: "GET, PUT, POST, DELETE",
//     allowedHeaders: "*",
//   });
//   // app.useGlobalInterceptors(new ResponseInterceptor());
//   app.useGlobalPipes(new ValidationPipe());
//   await app.listen(3000);
// }
// bootstrap();

// include socket server version
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { IoAdapter } from "@nestjs/platform-socket.io";
import { Server, Socket } from "socket.io";

interface CustomeSocket extends Socket {
  username?: string;
  userId: number;
}

class CustomIoAdapter extends IoAdapter {
  private server: Server;

  createIOServer(port: number, options?: any): any {
    this.server = super.createIOServer(port, {
      ...options,
      cors: {
        origin: "http://localhost:3001",
      },
    });

    this.server.use((socket: CustomeSocket, next: (err?: any) => void) => {
      const username = socket.handshake.auth.username;
      const userId = socket.handshake.auth.userId;
      console.log(`[SERVER] username: ${username}, userId: ${userId}`);
      if (!username) {
        return next(new Error("invalid username"));
      }
      socket.username = username;
      // socket.userId = userId;
      next();
    });

    // lắng nghe sự kiện client connect tới server
    this.server.on("connection", async (socket: CustomeSocket) => {
      const users = [];
      for (let [id, socket] of this.server.of("/").sockets) {
        let userId = socket.handshake.auth.userId;
        console.log(`[SERVER] [connection event] userId: ${userId}`);
        users.push({
          // userID: id,
          socketId: id,
          username: (socket as CustomeSocket).username,
          userId: userId,
        });
      }
      socket.emit("users", users);

      socket.broadcast.emit("user connected", {
        // userID: socket.id,
        socketId: socket.id,
        username: socket.username,
        userId: socket.handshake.auth.userId,
      });

      socket.on(
        "private message",
        ({ content, to, sendFromUser, receivedUserId }) => {
          console.log(
            `[SERVER] [private message] receivedUserId: ${receivedUserId}`,
          );

          socket.to(to).emit("private message", {
            content,
            from: socket.id,
            sendFromUser,
            receivedUserId,
          });
        },
      );

      socket.on("disconnect", () => {
        socket.broadcast.emit("user disconnected", socket.id);
      });
    });

    return this.server;
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new CustomIoAdapter(app));
  app.enableCors({
    origin: "*",
    methods: "GET, PUT, POST, DELETE, PATCH",
    allowedHeaders: "*",
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
  console.log(`server listening at http://localhost:3000`);
}

bootstrap();
