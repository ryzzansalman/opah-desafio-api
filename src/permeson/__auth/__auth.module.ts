import { Module } from '@nestjs/common';
import { __ProfileRepository } from '../__profile/__profile.repository';
import { __SharingRepository } from '../__sharing/__sharing.repository';
import { __UserRepository } from '../__user/__user.repository';
import { __AuthController } from './__auth.controller';

@Module({
  controllers: [__AuthController],
  providers: [
    __UserRepository,
    __ProfileRepository,
    __SharingRepository,
  ],
})
export class __AuthModule { }
