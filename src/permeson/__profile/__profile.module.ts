import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AuthMiddleware } from "../middleware/auth.middleware";
import { __ProfileController } from "./__profile.controller";
import { __ProfileRepository } from "./__profile.repository";

@Module({
  controllers: [__ProfileController],
  providers: [__ProfileRepository],
})
export class __ProfileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("__profile");
  }
}
