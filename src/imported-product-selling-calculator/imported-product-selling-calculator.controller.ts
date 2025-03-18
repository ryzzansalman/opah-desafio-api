import { Controller, Get, Post, Put, Delete, Query, Param, Req, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
    import { ResponseService, IApiResponse } from '../../common/services/http-response.service';
    import { FileInterceptor } from '@nestjs/platform-express';
    import { diskStorage } from 'multer';
    import { extname } from 'path';
    import { StorageService } from '../../common/services/storage.service';
    import { v4 as uuidv4 } from 'uuid';
    
    import { ImportedProductSellingCalculatorService } from './imported-product-selling-calculator.service';
    import { ImportedProductSellingCalculator } from './imported-product-selling-calculator.model';
    import {
      CreateImportedProductSellingCalculatorDto,
  ImportedProductSellingCalculatorApiResponseDto,
  ImportedProductSellingCalculatorListApiResponseDto,    
    } from './dto/create-imported-product-selling-calculator.dto';
    import { ApiBearerAuth, ApiTags, ApiBody, ApiResponse  , ApiConsumes } from '@nestjs/swagger';

    @ApiTags('Imported product selling calculator')
    @ApiBearerAuth()
    @Controller('/imported-products-selling-calculator')
    export class ImportedProductSellingCalculatorController {
        constructor(
          private readonly importedProductSellingCalculatorService: ImportedProductSellingCalculatorService,
          private readonly responseService: ResponseService,
          private readonly storageService: StorageService,
        ) { }

        @Post()
        @ApiBody({ type: CreateImportedProductSellingCalculatorDto })
        @ApiResponse({ type: ImportedProductSellingCalculatorApiResponseDto })
        async create(
          @Body() createImportedProductSellingCalculatorDto: CreateImportedProductSellingCalculatorDto,
          @Req() req: any
      ): Promise<IApiResponse<ImportedProductSellingCalculator | {}>> {
      try {
        const data = await this.importedProductSellingCalculatorService.create({...createImportedProductSellingCalculatorDto, createdBy: req.userId, ownerId: req.ownerId});

        return this.responseService.created(data, 'ImportedProductSellingCalculator created', '/imported-products-selling-calculator');
      } catch(err) {
        return this.responseService.badRequest({}, err.message, '/imported-products-selling-calculator')
      }
    }

        @Get()
        @ApiResponse({ type: ImportedProductSellingCalculatorListApiResponseDto })
        async findAll(
          @Req() req: any,
          @Query('page') page: number = 0,
          @Query('limit') limit: number = 100,
          @Query('filter') filter: string = '{}',
        ): Promise<IApiResponse> {
          try {
            const [result, total] = await Promise.all([
              this.importedProductSellingCalculatorService.findAll({page, limit, filter}, req.userId, req.ownerId),
              this.importedProductSellingCalculatorService.count(filter, req.userId, req.ownerId),
            ]);
            return this.responseService.ok({result, total, page}, 'ImportedProductSellingCalculator returned', `/imported-products-selling-calculator?page=${page}&limit=${limit}&filter=${filter}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/imported-products-selling-calculator?page=${page}&limit=${limit}&filter=${filter}`);
          }
        }

        @Get(':id')
        @ApiResponse({ type: ImportedProductSellingCalculatorApiResponseDto })
        async findOne(
          @Param('id') id: string,
          @Req() req: any,
        ): Promise<IApiResponse<ImportedProductSellingCalculator | {}>> {
          try {
            const data = await this.importedProductSellingCalculatorService.findOne(id, req.ownerId);
            return this.responseService.ok(data, 'ImportedProductSellingCalculator returned', `/imported-products-selling-calculator/${id}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/imported-products-selling-calculator/${id}`)
          }
        }

        @Put(':id')
        @ApiBody({ type: CreateImportedProductSellingCalculatorDto })
        @ApiResponse({ type: ImportedProductSellingCalculatorApiResponseDto })
        async update(
          @Param('id') id: string, @Body() updateImportedProductSellingCalculatorDto: CreateImportedProductSellingCalculatorDto,
      ): Promise<IApiResponse<ImportedProductSellingCalculator | {}>> {
        try {
            const data = await this.importedProductSellingCalculatorService.update(id, updateImportedProductSellingCalculatorDto);

            return this.responseService.ok(data, 'ImportedProductSellingCalculator returned', `/imported-products-selling-calculator/${id}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/imported-products-selling-calculator/${id}`)
          }
        }

        @Delete(':id')
        @ApiResponse({ type: ImportedProductSellingCalculatorApiResponseDto })
        async remove(
          @Param('id') id: string,
        ): Promise<IApiResponse> {
          try {
            await this.importedProductSellingCalculatorService.remove(id);
            return this.responseService.ok({}, 'ImportedProductSellingCalculator deleted', `/imported-products-selling-calculator/${id}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/imported-products-selling-calculator/${id}`)
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

            const url = await this.storageService.uploadFile(bucketName, file, `desafio/${req.ownerId}/imported-product-selling-calculator/${remoteFileName}`);

            return this.responseService.ok({ filename, fileId, url }, 'Upload successfuly');
          } catch(err) {
            return this.responseService.badRequest({}, err.message)
          }
        }
    }
    