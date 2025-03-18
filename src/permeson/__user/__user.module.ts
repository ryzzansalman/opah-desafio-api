import { Module } from '@nestjs/common';
import { __UserRepository } from './__user.repository';

@Module({
  providers: [__UserRepository],
})
export class __UserModule { }
