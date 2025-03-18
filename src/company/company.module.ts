import { Module } from '@nestjs/common';
    import { ResponseService } from '../../common/services/http-response.service';
    import { StorageService } from '../../common/services/storage.service';
    import { MongooseModule } from '@nestjs/mongoose';
    import { CompanyController } from './company.controller';
    import { CompanyService } from './company.service';
    import { Company, CompanySchema } from './company.model';
    
    import { NestModule, MiddlewareConsumer } from "@nestjs/common";
    import { AuthMiddleware } from "../permeson/middleware/auth.middleware";

    @Module({
      imports: [
        MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }])],
      controllers: [CompanyController],
      providers: [
        CompanyService, ResponseService,
        StorageService,
      ],
      exports: [
        ResponseService,
        StorageService,
      ],
    })

    export class CompanyModule implements NestModule {
      configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes("/companies");
      }
    }