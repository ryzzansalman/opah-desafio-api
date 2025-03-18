import { Controller, Get, Post, Put, Delete, Query, Param, Req, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
    import { ResponseService, IApiResponse } from '../../common/services/http-response.service';
    import { FileInterceptor } from '@nestjs/platform-express';
    import { diskStorage } from 'multer';
    import { extname } from 'path';
    import { StorageService } from '../../common/services/storage.service';
    import { v4 as uuidv4 } from 'uuid';
    
    import { TagService } from './tag.service';
    import { Tag } from './tag.model';
    import {
      CreateTagDto,
  TagApiResponseDto,
  TagListApiResponseDto,    
    } from './dto/create-tag.dto';
    import { ApiBearerAuth, ApiTags, ApiBody, ApiResponse  , ApiConsumes } from '@nestjs/swagger';

    @ApiTags('Tag')
    @ApiBearerAuth()
    @Controller('/tags')
    export class TagController {
        constructor(
          private readonly tagService: TagService,
          private readonly responseService: ResponseService,
          private readonly storageService: StorageService,
        ) { }

        @Post()
        @ApiBody({ type: CreateTagDto })
        @ApiResponse({ type: TagApiResponseDto })
        async create(
          @Body() createTagDto: CreateTagDto,
          @Req() req: any
      ): Promise<IApiResponse<Tag | {}>> {
      try {
        const data = await this.tagService.create({...createTagDto, createdBy: req.userId, ownerId: req.ownerId});

        return this.responseService.created(data, 'Tag created', '/tags');
      } catch(err) {
        return this.responseService.badRequest({}, err.message, '/tags')
      }
    }

        @Get()
        @ApiResponse({ type: TagListApiResponseDto })
        async findAll(
          @Req() req: any,
          @Query('page') page: number = 0,
          @Query('limit') limit: number = 100,
          @Query('filter') filter: string = '{}',
        ): Promise<IApiResponse> {
          try {
            const [result, total] = await Promise.all([
              this.tagService.findAll({page, limit, filter}, req.userId, req.ownerId),
              this.tagService.count(filter, req.userId, req.ownerId),
            ]);
            return this.responseService.ok({result, total, page}, 'Tag returned', `/tags?page=${page}&limit=${limit}&filter=${filter}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/tags?page=${page}&limit=${limit}&filter=${filter}`);
          }
        }

        @Get(':id')
        @ApiResponse({ type: TagApiResponseDto })
        async findOne(
          @Param('id') id: string,
          @Req() req: any,
        ): Promise<IApiResponse<Tag | {}>> {
          try {
            const data = await this.tagService.findOne(id, req.ownerId);
            return this.responseService.ok(data, 'Tag returned', `/tags/${id}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/tags/${id}`)
          }
        }

        @Put(':id')
        @ApiBody({ type: CreateTagDto })
        @ApiResponse({ type: TagApiResponseDto })
        async update(
          @Param('id') id: string, @Body() updateTagDto: CreateTagDto,
      ): Promise<IApiResponse<Tag | {}>> {
        try {
            const data = await this.tagService.update(id, updateTagDto);

            return this.responseService.ok(data, 'Tag returned', `/tags/${id}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/tags/${id}`)
          }
        }

        @Delete(':id')
        @ApiResponse({ type: TagApiResponseDto })
        async remove(
          @Param('id') id: string,
        ): Promise<IApiResponse> {
          try {
            await this.tagService.remove(id);
            return this.responseService.ok({}, 'Tag deleted', `/tags/${id}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/tags/${id}`)
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

            const url = await this.storageService.uploadFile(bucketName, file, `desafio/${req.ownerId}/tag/${remoteFileName}`);

            return this.responseService.ok({ filename, fileId, url }, 'Upload successfuly');
          } catch(err) {
            return this.responseService.badRequest({}, err.message)
          }
        }
    }
    