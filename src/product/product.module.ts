import { Module } from '@nestjs/common';
    import { ResponseService } from '../../common/services/http-response.service';
    import { StorageService } from '../../common/services/storage.service';
    import { MongooseModule } from '@nestjs/mongoose';
    import { ProductController } from './product.controller';
    import { ProductService } from './product.service';
    import { Product, ProductSchema } from './product.model';
    
    

    @Module({
      imports: [
        MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }])],
      controllers: [ProductController],
      providers: [
        ProductService, ResponseService,
        StorageService,
      ],
      exports: [
        ResponseService,
        StorageService,
      ],
    })

    export class ProductModule  {
      
    }