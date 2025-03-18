import { Module } from '@nestjs/common';
    import { ResponseService } from '../../common/services/http-response.service';
    import { StorageService } from '../../common/services/storage.service';
    import { MongooseModule } from '@nestjs/mongoose';
    import { ImportedProductSellingCalculatorController } from './imported-product-selling-calculator.controller';
    import { ImportedProductSellingCalculatorService } from './imported-product-selling-calculator.service';
    import { ImportedProductSellingCalculator, ImportedProductSellingCalculatorSchema } from './imported-product-selling-calculator.model';
    
    import { NestModule, MiddlewareConsumer } from "@nestjs/common";
    import { AuthMiddleware } from "../permeson/middleware/auth.middleware";

    @Module({
      imports: [
        MongooseModule.forFeature([{ name: ImportedProductSellingCalculator.name, schema: ImportedProductSellingCalculatorSchema }])],
      controllers: [ImportedProductSellingCalculatorController],
      providers: [
        ImportedProductSellingCalculatorService, ResponseService,
        StorageService,
      ],
      exports: [
        ResponseService,
        StorageService,
      ],
    })

    export class ImportedProductSellingCalculatorModule implements NestModule {
      configure(consumer: MiddlewareConsumer) {
        consumer.apply(AuthMiddleware).forRoutes("/imported-products-selling-calculator");
      }
    }