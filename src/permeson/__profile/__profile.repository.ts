import { Injectable } from '@nestjs/common';
import __ProfileModel from './__profile.model';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class __ProfileRepository {

  async createProfile(createProfileDto: CreateProfileDto) {
    const createdPerson = new __ProfileModel(createProfileDto);
    return createdPerson.save();
  }

  async updateProfile(id: string, updateProfileDto: CreateProfileDto) {
    return __ProfileModel.findByIdAndUpdate(id, updateProfileDto, { new: true }).exec();
  }

  async updateProfileByUserId(id: string, updateProfileDto: CreateProfileDto) {
    return __ProfileModel.findOneAndUpdate({ userId: id }, updateProfileDto, { new: true }).exec();
  }

  async getProfileById(id: string) {
    return __ProfileModel.findById(id).populate('userId').exec();
  }

  async getProfileByUserId(userId: string) {
    return __ProfileModel.findOne({ userId }).exec();
  }
  
  async getProfileByUserIds(userIds: string[]) {
    return __ProfileModel.find({ userId: {'$in': userIds} }).exec();
  }

  async getProfiles({ page, limit, filter }: { page: number; limit: number; filter: string; }) {
    return __ProfileModel
      .find({
        ...JSON.parse(filter),
        _deletedAt: null,
      })
      .skip(page * limit)
      .limit(limit)
      .exec();
  }

  async softDeleteProfile(id: string) {
    return __ProfileModel.findByIdAndUpdate(id, { _deletedAt: Date.now() }).exec();
  }

  async deleteProfile(id: string) {
    return __ProfileModel.findByIdAndDelete(id).exec();
  }
}
