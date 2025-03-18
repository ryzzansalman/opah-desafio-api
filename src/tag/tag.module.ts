import { Module } from '@nestjs/common';
    import { ResponseService } from '../../common/services/http-response.service';
    import { StorageService } from '../../common/services/storage.service';
    import { MongooseModule } from '@nestjs/mongoose';
    import { TagController } from './tag.controller';
    import { TagService } from './tag.service';
    import { Tag, TagSchema } from './tag.model';
    
    import { NestModule, MiddlewareConsumer } from "@nestjs/common";
    import { AuthMiddleware } from "../permeson/middleware/auth.middleware";

    @Module({
      imports: [
        MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])],
      controllers: [TagController],
      providers: [
        TagService, ResponseService,
        StorageService,
      ],
      exports: [
        ResponseService,
        StorageService,
      ],
    })

    export class TagModule implements NestModule {
      configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes("/tags");
      }
    }