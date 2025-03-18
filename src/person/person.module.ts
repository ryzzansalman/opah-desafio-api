import { Module } from '@nestjs/common';
    import { ResponseService } from '../../common/services/http-response.service';
    import { StorageService } from '../../common/services/storage.service';
    import { MongooseModule } from '@nestjs/mongoose';
    import { PersonController } from './person.controller';
    import { PersonService } from './person.service';
    import { Person, PersonSchema } from './person.model';
    
    import { NestModule, MiddlewareConsumer } from "@nestjs/common";
    import { AuthMiddleware } from "../permeson/middleware/auth.middleware";

    @Module({
      imports: [
        MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }])],
      controllers: [PersonController],
      providers: [
        PersonService, ResponseService,
        StorageService,
      ],
      exports: [
        ResponseService,
        StorageService,
      ],
    })

    export class PersonModule implements NestModule {
      configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes("/people");
      }
    }