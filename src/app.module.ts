import { Module } from '@nestjs/common';
        import {
          __AuthModule,
          __ProfileModule,
          __SharingModule,
          __UserModule,
        } from './permeson';
        
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';


















import { ProductModule } from './product/product.module';
import { NcmModule } from './ncm/ncm.module';
import { ImportedProductSellingCalculatorModule } from './imported-product-selling-calculator/imported-product-selling-calculator.module';
import { PersonModule } from './person/person.module';
import { CompanyModule } from './company/company.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
        __SharingModule,
        __AuthModule,
        __ProfileModule,
        __UserModule,
        MongooseModule.forRoot('mongodb+srv://kunlatek:Kunlatek751@cluster0.b0pfr.mongodb.net/desafio-v1'), ProductModule, NcmModule, ImportedProductSellingCalculatorModule, PersonModule, CompanyModule, TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
