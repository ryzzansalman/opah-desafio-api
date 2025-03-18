import { Model } from 'mongoose';
    import { Injectable } from '@nestjs/common';
    import { InjectModel } from '@nestjs/mongoose';
    import { Tag } from './tag.model';
    import { CreateTagDto } from './dto/create-tag.dto';

    @Injectable()
    export class TagService {
      constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

      async create(createTagDto): Promise<Tag> {
        const createdTag = new this.tagModel(createTagDto);
        return createdTag.save();
      }

      async findAll({page, limit, filter}:{page:number, limit:number, filter: string}, userId: string, ownerId?: string): Promise<Tag[]> {
        return this.tagModel.find({
      ...formatFilterSearch(filter),
      ownerId, 
      _deletedAt: null
    })
    .skip(page * limit)
    .limit(limit)
    .exec();
      }

      async count(filter: string, userId: string, ownerId?: string): Promise<number> {
        return this.tagModel.find({
          ...formatFilterSearch(filter),
          ownerId, 
          _deletedAt: null
        })
          .countDocuments()
          .exec()
      }

      async findOne(id: string, ownerId?: string): Promise<Tag> {
        const tag = await this.tagModel.findById(id).exec();
        if (!tag) {
          throw new Error(`Tag with id ${id} not found`);
        }
        return tag;
      }

      async update(id: string, updateTagDto: CreateTagDto): Promise<Tag> {
        const updatedTag = await this.tagModel.findByIdAndUpdate(id, updateTagDto, { new: true });
        if (!updatedTag) {
          throw new Error(`Tag with id ${id} not found`);
        }
        return updatedTag;
      }

      async softRemove(id: string): Promise<Tag> {
        const updatedTag = await this.tagModel.findByIdAndUpdate(
          id,
          { _deletedAt: Date.now() },
          { new: true }
        );

        if (!updatedTag) {
          throw new Error(`Tag with id ${id} not found`);
        }

        return updatedTag;
      }

      async remove(id: string): Promise<Tag> {
        const tag = await this.tagModel.findByIdAndDelete(id);
        if (!tag) {
          throw new Error(`Tag with id ${id} not found`);
        }
        return tag;
      }
    }

    /**
     * Formats the search filter by removing specified fields.
     *
     * @param filter - The filter to be formatted.
     * @returns The formatted filter.
     */
    const formatFilterSearch = (filter: string) => {
      const fieldsToRemoveFromFilter = [];
      const hasPropertyListInFieldsToRemove = (obj: any) => {
        return fieldsToRemoveFromFilter.some(prop => prop in obj);
      }
      const jsonFilter = JSON.parse(filter);
      if(jsonFilter['$or']){
        jsonFilter['$or'] = jsonFilter['$or'].filter((searchFieldObject: any) => {
          return !hasPropertyListInFieldsToRemove(searchFieldObject);
        });
      }
      return jsonFilter;
    };

    /**
     * Prepares the data object for soft deletion by removing all properties except for the ones specified in the keysToPreserve array.
     *
     * @param data - The data object to be prepared for soft deletion.
     * @returns The modified data object with only the preserved properties.
     */
    const prepareDataToSoftDelete = (data: any) => {
      const keysToPreserve = ['createdAt', 'updatedAt', 'createdBy', '_id'];

      for (const key in data) {
        if (!keysToPreserve.includes(key)) {
          delete data[key];
        }
      }

      return data;
    }
    