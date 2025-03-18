import { Body, Controller, Get, HttpException, HttpStatus, Post, Put, Query, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { __ProfileRepository } from './__profile.repository';
import { CreateProfileDto, ProfileListResponseDto, ProfileResponseDto } from './dto/create-profile.dto';

@ApiTags('Autentikigo')
@ApiBearerAuth()
@Controller('__profile')
export class __ProfileController {
  constructor(
    private readonly profileRepository: __ProfileRepository,
  ) { }

  @Post()
  @ApiBody({ type: CreateProfileDto })
  @ApiResponse({ status: 201 })
  async createPerson(
    @Req() req: Request,
    @Body() createPersonDto: CreateProfileDto
  ) {
    try {
      const data = await this.profileRepository.createProfile({
        ...createPersonDto,
        userId: req['userId'],
      });
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put()
  @ApiBody({ type: CreateProfileDto })
  @ApiResponse({ status: 204 })
  async updatePerson(
    @Req() req: Request,
    @Body() updatePersonDto: CreateProfileDto
  ) {
    try {
      const data = await this.profileRepository.updateProfileByUserId(
        req['userId'],
        updatePersonDto
      );
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  @ApiResponse({ status: 200, type: ProfileResponseDto })
  async getPersonProfile(
    @Req() req: Request,
  ) {
    try {
      const data = await this.profileRepository.getProfileByUserId(req['userId']);
      return data;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('users')
  @ApiResponse({ status: 200, type: ProfileListResponseDto })
  async getUsersProfile(
    @Query('ids') ids: string,
    @Query('filter') filter: string = '{}',
  ) {
    try {
      const result = filter != '{}' ?
        await this.profileRepository.getProfiles({ page: 0, limit: 10, filter }) :
        await this.profileRepository.getProfileByUserIds(ids.split(','));

      return { result, total: result.length, page: 0 };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}
