import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { __SharingController } from "./__sharing.controller";
import { __SharingRepository } from "./__sharing.repository";

@Module({
  controllers: [__SharingController],
  providers: [__SharingRepository],
})
export class __SharingModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("__sharing");
  }
}
