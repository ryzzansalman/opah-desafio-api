import { Controller, Get, Post, Put, Delete, Query, Param, Req, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
    import { ResponseService, IApiResponse } from '../../common/services/http-response.service';
    import { FileInterceptor } from '@nestjs/platform-express';
    import { diskStorage } from 'multer';
    import { extname } from 'path';
    import { StorageService } from '../../common/services/storage.service';
    import { v4 as uuidv4 } from 'uuid';
    
    import { NcmService } from './ncm.service';
    import { Ncm } from './ncm.model';
    import {
      CreateNcmDto,
  NcmApiResponseDto,
  NcmListApiResponseDto,    
    } from './dto/create-ncm.dto';
    import { ApiBearerAuth, ApiTags, ApiBody, ApiResponse  , ApiConsumes } from '@nestjs/swagger';

    @ApiTags('Ncm')
    @ApiBearerAuth()
    @Controller('/ncms')
    export class NcmController {
        constructor(
          private readonly ncmService: NcmService,
          private readonly responseService: ResponseService,
          private readonly storageService: StorageService,
        ) { }

        @Post()
        @ApiBody({ type: CreateNcmDto })
        @ApiResponse({ type: NcmApiResponseDto })
        async create(
          @Body() createNcmDto: CreateNcmDto,
          @Req() req: any
      ): Promise<IApiResponse<Ncm | {}>> {
      try {
        const data = await this.ncmService.create({...createNcmDto, createdBy: req.userId, ownerId: req.ownerId});

        return this.responseService.created(data, 'Ncm created', '/ncms');
      } catch(err) {
        return this.responseService.badRequest({}, err.message, '/ncms')
      }
    }

        @Get()
        @ApiResponse({ type: NcmListApiResponseDto })
        async findAll(
          @Req() req: any,
          @Query('page') page: number = 0,
          @Query('limit') limit: number = 100,
          @Query('filter') filter: string = '{}',
        ): Promise<IApiResponse> {
          try {
            const [result, total] = await Promise.all([
              this.ncmService.findAll({page, limit, filter}, req.userId, req.ownerId),
              this.ncmService.count(filter, req.userId, req.ownerId),
            ]);
            return this.responseService.ok({result, total, page}, 'Ncm returned', `/ncms?page=${page}&limit=${limit}&filter=${filter}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/ncms?page=${page}&limit=${limit}&filter=${filter}`);
          }
        }

        @Get(':id')
        @ApiResponse({ type: NcmApiResponseDto })
        async findOne(
          @Param('id') id: string,
          @Req() req: any,
        ): Promise<IApiResponse<Ncm | {}>> {
          try {
            const data = await this.ncmService.findOne(id, req.ownerId);
            return this.responseService.ok(data, 'Ncm returned', `/ncms/${id}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/ncms/${id}`)
          }
        }

        @Put(':id')
        @ApiBody({ type: CreateNcmDto })
        @ApiResponse({ type: NcmApiResponseDto })
        async update(
          @Param('id') id: string, @Body() updateNcmDto: CreateNcmDto,
      ): Promise<IApiResponse<Ncm | {}>> {
        try {
            const data = await this.ncmService.update(id, updateNcmDto);

            return this.responseService.ok(data, 'Ncm returned', `/ncms/${id}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/ncms/${id}`)
          }
        }

        @Delete(':id')
        @ApiResponse({ type: NcmApiResponseDto })
        async remove(
          @Param('id') id: string,
        ): Promise<IApiResponse> {
          try {
            await this.ncmService.remove(id);
            return this.responseService.ok({}, 'Ncm deleted', `/ncms/${id}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/ncms/${id}`)
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

            const url = await this.storageService.uploadFile(bucketName, file, `desafio/${req.ownerId}/ncm/${remoteFileName}`);

            return this.responseService.ok({ filename, fileId, url }, 'Upload successfuly');
          } catch(err) {
            return this.responseService.badRequest({}, err.message)
          }
        }
    }
    