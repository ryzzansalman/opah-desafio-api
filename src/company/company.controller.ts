import { Controller, Get, Post, Put, Delete, Query, Param, Req, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
    import { ResponseService, IApiResponse } from '../../common/services/http-response.service';
    import { FileInterceptor } from '@nestjs/platform-express';
    import { diskStorage } from 'multer';
    import { extname } from 'path';
    import { StorageService } from '../../common/services/storage.service';
    import { v4 as uuidv4 } from 'uuid';
    
    import { CompanyService } from './company.service';
    import { Company } from './company.model';
    import {
      CreateCompanyDto,
  CompanyApiResponseDto,
  CompanyListApiResponseDto,    
    } from './dto/create-company.dto';
    import { ApiBearerAuth, ApiTags, ApiBody, ApiResponse  , ApiConsumes } from '@nestjs/swagger';

    @ApiTags('Company')
    @ApiBearerAuth()
    @Controller('/companies')
    export class CompanyController {
        constructor(
          private readonly companyService: CompanyService,
          private readonly responseService: ResponseService,
          private readonly storageService: StorageService,
        ) { }

        @Post()
        @ApiBody({ type: CreateCompanyDto })
        @ApiResponse({ type: CompanyApiResponseDto })
        async create(
          @Body() createCompanyDto: CreateCompanyDto,
          @Req() req: any
      ): Promise<IApiResponse<Company | {}>> {
      try {
        const data = await this.companyService.create({...createCompanyDto, createdBy: req.userId, ownerId: req.ownerId});

        return this.responseService.created(data, 'Company created', '/companies');
      } catch(err) {
        return this.responseService.badRequest({}, err.message, '/companies')
      }
    }

        @Get()
        @ApiResponse({ type: CompanyListApiResponseDto })
        async findAll(
          @Req() req: any,
          @Query('page') page: number = 0,
          @Query('limit') limit: number = 100,
          @Query('filter') filter: string = '{}',
        ): Promise<IApiResponse> {
          try {
            const [result, total] = await Promise.all([
              this.companyService.findAll({page, limit, filter}, req.userId, req.ownerId),
              this.companyService.count(filter, req.userId, req.ownerId),
            ]);
            return this.responseService.ok({result, total, page}, 'Company returned', `/companies?page=${page}&limit=${limit}&filter=${filter}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/companies?page=${page}&limit=${limit}&filter=${filter}`);
          }
        }

        @Get(':id')
        @ApiResponse({ type: CompanyApiResponseDto })
        async findOne(
          @Param('id') id: string,
          @Req() req: any,
        ): Promise<IApiResponse<Company | {}>> {
          try {
            const data = await this.companyService.findOne(id, req.ownerId);
            return this.responseService.ok(data, 'Company returned', `/companies/${id}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/companies/${id}`)
          }
        }

        @Put(':id')
        @ApiBody({ type: CreateCompanyDto })
        @ApiResponse({ type: CompanyApiResponseDto })
        async update(
          @Param('id') id: string, @Body() updateCompanyDto: CreateCompanyDto,
      ): Promise<IApiResponse<Company | {}>> {
        try {
            const data = await this.companyService.update(id, updateCompanyDto);

            return this.responseService.ok(data, 'Company returned', `/companies/${id}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/companies/${id}`)
          }
        }

        @Delete(':id')
        @ApiResponse({ type: CompanyApiResponseDto })
        async remove(
          @Param('id') id: string,
        ): Promise<IApiResponse> {
          try {
            await this.companyService.remove(id);
            return this.responseService.ok({}, 'Company deleted', `/companies/${id}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/companies/${id}`)
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

            const url = await this.storageService.uploadFile(bucketName, file, `desafio/${req.ownerId}/company/${remoteFileName}`);

            return this.responseService.ok({ filename, fileId, url }, 'Upload successfuly');
          } catch(err) {
            return this.responseService.badRequest({}, err.message)
          }
        }
    }
    