import { Injectable } from "@nestjs/common";
import __SharingModel from "./__sharing.model";
import { CreateSharingDto } from "./dto/create-sharing.dto";

@Injectable()
export class __SharingRepository {
  async createSharing(createSharingDto: CreateSharingDto) {
    const createdSharing = new __SharingModel(createSharingDto);
    return createdSharing.save();
  }

  async updateSharing(
    sharingId: string,
    updateSharingDto: CreateSharingDto
  ) {
    return __SharingModel
      .findByIdAndUpdate(sharingId, updateSharingDto, { new: true })
      .exec();
  }

  async getShares({ page, limit, filter }: { page: number; limit: number; filter: any; }) {
    return __SharingModel
      .find({
        ...filter,
        _deletedAt: null,
      })
      .skip(page * limit)
      .limit(limit)
      .exec();
  }

  async count(filter: any) {
    return __SharingModel.find({
      ...filter,
      _deletedAt: null
    })
      .countDocuments()
      .exec();
  }

  async getSharingById(sharingId: string) {
    return __SharingModel
      .findById(sharingId)
      .exec();
  }

  async softDeleteSharing(sharingId: string) {
    return __SharingModel.findByIdAndUpdate(sharingId, { _deletedAt: Date.now() }).exec();
  }

  async deleteSharing(sharingId: string) {
    return __SharingModel.findByIdAndDelete(sharingId).exec();
  }
}
