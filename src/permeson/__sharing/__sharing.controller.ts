import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { __SharingRepository } from './__sharing.repository';
import {
  CreateSharingDto,
  SharingListResponseDto,
  SharingResponseDto,
} from './dto/create-sharing.dto';

@ApiTags('Autentikigo')
@ApiBearerAuth()
@Controller('__sharing')
export class __SharingController {
  constructor(
    private readonly sharingRepository: __SharingRepository
  ) { }

  @Post()
  @ApiBody({ type: CreateSharingDto })
  @ApiResponse({ status: 201 })
  async createSharing(
    @Body() createSharingDto: CreateSharingDto,
  ) {
    try {
      await this.sharingRepository.createSharing(createSharingDto);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put(':sharingId')
  @ApiBody({ type: CreateSharingDto })
  @ApiResponse({ status: 204 })
  async updateSharing(
    @Param('sharingId') sharingId: string,
    @Body() updateSharingDto: CreateSharingDto,
  ) {
    try {
      await this.sharingRepository.updateSharing(
        sharingId,
        updateSharingDto
      );
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiResponse({ status: 200, type: SharingListResponseDto })
  async getShares(
    @Req() req: any,
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 100,
    @Query('filter') filter: any = {},
  ) {
    try {
      const [result, total] = await Promise.all([
        this.sharingRepository.getShares({ page, limit, filter: { ...filter, collaboratorId: req['userId'] } }),
        this.sharingRepository.count({ ...filter, collaboratorId: req['userId'] }),
      ]);
      return { result, total, page };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('owner')
  @ApiResponse({ status: 200, type: SharingListResponseDto })
  async getOwnerShares(
    @Req() req: any,
    @Query('page') page: number = 0,
    @Query('limit') limit: number = 100,
    @Query('filter') filter: any = {},
  ) {
    try {
      const [result, total] = await Promise.all([
        this.sharingRepository.getShares({ page, limit, filter: { ...filter, ownerId: req['ownerId'] } }),
        this.sharingRepository.count({ ...filter, ownerId: req['ownerId'] }),
      ]);
      return { result, total, page };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':sharingId')
  @ApiResponse({ status: 200, type: SharingResponseDto })
  async getSharingById(
    @Param('sharingId') sharingId: string,
  ) {
    try {
      const data = await this.sharingRepository.getSharingById(sharingId);
      return data;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(':sharingId')
  @ApiResponse({ status: 200 })
  async deleteSharing(
    @Param('sharingId') sharingId: string,
  ) {
    try {
      await this.sharingRepository.deleteSharing(sharingId);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
