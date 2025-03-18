import { Controller, Get, Post, Put, Delete, Query, Param, Req, Body, UploadedFile, UseInterceptors } from '@nestjs/common';
    import { ResponseService, IApiResponse } from '../../common/services/http-response.service';
    import { FileInterceptor } from '@nestjs/platform-express';
    import { diskStorage } from 'multer';
    import { extname } from 'path';
    import { StorageService } from '../../common/services/storage.service';
    import { v4 as uuidv4 } from 'uuid';
    
    import { PersonService } from './person.service';
    import { Person } from './person.model';
    import {
      CreatePersonDto,
  PersonApiResponseDto,
  PersonListApiResponseDto,    
    } from './dto/create-person.dto';
    import { ApiBearerAuth, ApiTags, ApiBody, ApiResponse  , ApiConsumes } from '@nestjs/swagger';

    @ApiTags('Person')
    @ApiBearerAuth()
    @Controller('/people')
    export class PersonController {
        constructor(
          private readonly personService: PersonService,
          private readonly responseService: ResponseService,
          private readonly storageService: StorageService,
        ) { }

        @Post()
        @ApiBody({ type: CreatePersonDto })
        @ApiResponse({ type: PersonApiResponseDto })
        async create(
          @Body() createPersonDto: CreatePersonDto,
          @Req() req: any
      ): Promise<IApiResponse<Person | {}>> {
      try {
        const data = await this.personService.create({...createPersonDto, createdBy: req.userId, ownerId: req.ownerId});

        return this.responseService.created(data, 'Person created', '/people');
      } catch(err) {
        return this.responseService.badRequest({}, err.message, '/people')
      }
    }

        @Get()
        @ApiResponse({ type: PersonListApiResponseDto })
        async findAll(
          @Req() req: any,
          @Query('page') page: number = 0,
          @Query('limit') limit: number = 100,
          @Query('filter') filter: string = '{}',
        ): Promise<IApiResponse> {
          try {
            const [result, total] = await Promise.all([
              this.personService.findAll({page, limit, filter}, req.userId, req.ownerId),
              this.personService.count(filter, req.userId, req.ownerId),
            ]);
            return this.responseService.ok({result, total, page}, 'Person returned', `/people?page=${page}&limit=${limit}&filter=${filter}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/people?page=${page}&limit=${limit}&filter=${filter}`);
          }
        }

        @Get(':id')
        @ApiResponse({ type: PersonApiResponseDto })
        async findOne(
          @Param('id') id: string,
          @Req() req: any,
        ): Promise<IApiResponse<Person | {}>> {
          try {
            const data = await this.personService.findOne(id, req.ownerId);
            return this.responseService.ok(data, 'Person returned', `/people/${id}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/people/${id}`)
          }
        }

        @Put(':id')
        @ApiBody({ type: CreatePersonDto })
        @ApiResponse({ type: PersonApiResponseDto })
        async update(
          @Param('id') id: string, @Body() updatePersonDto: CreatePersonDto,
      ): Promise<IApiResponse<Person | {}>> {
        try {
            const data = await this.personService.update(id, updatePersonDto);

            return this.responseService.ok(data, 'Person returned', `/people/${id}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/people/${id}`)
          }
        }

        @Delete(':id')
        @ApiResponse({ type: PersonApiResponseDto })
        async remove(
          @Param('id') id: string,
        ): Promise<IApiResponse> {
          try {
            await this.personService.remove(id);
            return this.responseService.ok({}, 'Person deleted', `/people/${id}`);
          } catch(err) {
            return this.responseService.badRequest({}, err.message, `/people/${id}`)
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

            const url = await this.storageService.uploadFile(bucketName, file, `desafio/${req.ownerId}/person/${remoteFileName}`);

            return this.responseService.ok({ filename, fileId, url }, 'Upload successfuly');
          } catch(err) {
            return this.responseService.badRequest({}, err.message)
          }
        }
    }
    