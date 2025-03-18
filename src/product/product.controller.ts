import { Controller, Get, Post, Put, Delete, Query, Param, Req, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
    import { ResponseService, IApiResponse } from '../../common/services/http-response.service';
    import { FileInterceptor } from '@nestjs/platform-express';
    import { diskStorage } from 'multer';
    import { extname } from 'path';
    import { StorageService } from '../../common/services/storage.service';
    import { v4 as uuidv4 } from 'uuid';
    
    import { ProductService } from './product.service';
    import { Product } from './product.model';
    import {
      CreateProductDto,
  ProductApiResponseDto,
  ProductListApiResponseDto,    
    } from './dto/create-product.dto';
    import { ApiBearerAuth, ApiTags, ApiBody, ApiResponse  , ApiConsumes } from '@nestjs/swagger';

    @ApiTags('Product')
    @ApiBearerAuth()
    @Controller('/products')
    export class ProductController {
        constructor(
          private readonly productService: ProductService,
          private readonly responseService: ResponseService,
          private readonly storageService: StorageService,
        ) { }

        @Post()
        @ApiBody({ type: CreateProductDto })
        @ApiResponse({ type: ProductApiResponseDto })
        async create(
          @Body() createProductDto: CreateProductDto,
          @Req() req: any
      ): Promise<IApiResponse<Product | {}>> {
      try {
        const data = await this.productService.create({...createProductDto, createdBy: req.userId, ownerId: req.ownerId});

        return this.responseService.created(data, 'Product created', '/products');
      } catch(err) {
        return this.responseService.badRequest({}, err.message, '/products')
      }
    }

        @Get()
        @ApiResponse({ type: ProductListApiResponseDto })
        async findAll(
          @Req() req: any,
          @Query('page') page: number = 0,
          @Query('limit') limit: number = 100,
          @Query('filter') filter: string = '{}',
        ): Promise<IApiResponse> {
          try {
            const [result, total] = await Promise.all([
              this.productService.findAll({page, limit, filter}, req.userId, req.ownerId),
              this.productService.count(filter, req.userId, req.ownerId),
            ]);
            return this.responseService.ok({result, total, page}, 'Product returned', `/products?page=${page}&limit=${limit}&filter=${filter}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/products?page=${page}&limit=${limit}&filter=${filter}`);
          }
        }

        @Get(':id')
        @ApiResponse({ type: ProductApiResponseDto })
        async findOne(
          @Param('id') id: string,
          @Req() req: any,
        ): Promise<IApiResponse<Product | {}>> {
          try {
            const data = await this.productService.findOne(id, req.ownerId);
            return this.responseService.ok(data, 'Product returned', `/products/${id}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/products/${id}`)
          }
        }

        @Put(':id')
        @ApiBody({ type: CreateProductDto })
        @ApiResponse({ type: ProductApiResponseDto })
        async update(
          @Param('id') id: string, @Body() updateProductDto: CreateProductDto,
      ): Promise<IApiResponse<Product | {}>> {
        try {
            const data = await this.productService.update(id, updateProductDto);

            return this.responseService.ok(data, 'Product returned', `/products/${id}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/products/${id}`)
          }
        }

        @Delete(':id')
        @ApiResponse({ type: ProductApiResponseDto })
        async remove(
          @Param('id') id: string,
        ): Promise<IApiResponse> {
          try {
            await this.productService.remove(id);
            return this.responseService.ok({}, 'Product deleted', `/products/${id}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/products/${id}`)
          }
        }

        @Post('file')
        @ApiConsumes('multipart/form-data')
        @ApiBody({
          description: 'Arquivo a ser enviado',
          schema: {
            type: 'object',
            properties: {
              file: {
                type: 'string',
                format: 'binary',
              },
            },
          },
        })
        @ApiResponse({ status: 201, description: 'File uploaded successfully.' })
        @UseInterceptors(FileInterceptor('file', {
          storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
              const randomName = Array(32)
                .fill(null)
                .map(() => Math.round(Math.random() * 16).toString(16))
                .join('');
              return callback(null, `${randomName}${extname(file.originalname)}`);
            },
          }),
        }))
        async uploadFile(
          @UploadedFile() file: Express.Multer.File,
          @Req() req: any
        ): Promise<IApiResponse>{
          try {
            const bucketName = process.env.FIREBASE_STORAGE_BUCKET ?? 'rapida-develop.appspot.com';
            const filename = file.originalname;
            const fileId = uuidv4();
            const remoteFileName = `${fileId}-${filename}`;

            const url = await this.storageService.uploadFile(bucketName, file, `desafio/${req.ownerId}/product/${remoteFileName}`);

            return this.responseService.ok({ filename, fileId, url }, 'Upload successfuly');
          } catch(err) {
            return this.responseService.badRequest({}, err.message)
          }
        }
    }
    