import { AuthModule } from "./auth/auth.module";
import { AuthController } from "./auth/auth.controller";
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { UsersModule } from "./users/users.module";
import { AppController } from "./app.controller";

@Module({
  imports: [AuthModule, UsersModule, MongooseModule.forRoot("mongodb://localhost:27017/nestjs_teste")],
  controllers: [AuthController, AppController],
  providers: [],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(AuthMiddleware).exclude({ path: "users/login", method: RequestMethod.POST }).forRoutes({
  //     path: "*",
  //     method: RequestMethod.ALL,
  //   });
  // }
}
