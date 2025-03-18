import { Injectable } from '@nestjs/common';
import __UserModel from './__user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class __UserRepository {
  async createUser(createUserDto: CreateUserDto) {
    const createdUser = new __UserModel(createUserDto);
    return createdUser.save();
  }

  async updateUser(
    userId: string,
    updateUserDto: Partial<CreateUserDto>
  ) {
    return __UserModel.findByIdAndUpdate(userId, updateUserDto, {new: true}).exec();
  }

  async getUserById(userId: string) {
    return __UserModel.findById(userId).exec();
  }

  async getUserByEmail(email: string) {
    return __UserModel.findOne({ email }).exec();
  }

  async softDeleteUser(userId: string) {
    return __UserModel
      .findByIdAndUpdate(userId, { _deletedAt: Date.now() })
      .exec();
  }

  async deleteUser(userId: string) {
    return __UserModel.findByIdAndDelete(userId).exec();
  }
}
