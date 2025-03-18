import { Model } from 'mongoose';
    import { Injectable } from '@nestjs/common';
    import { InjectModel } from '@nestjs/mongoose';
    import { Person } from './person.model';
    import { CreatePersonDto } from './dto/create-person.dto';

    @Injectable()
    export class PersonService {
      constructor(@InjectModel(Person.name) private personModel: Model<Person>) {}

      async create(createPersonDto): Promise<Person> {
        const createdPerson = new this.personModel(createPersonDto);
        return createdPerson.save();
      }

      async findAll({page, limit, filter}:{page:number, limit:number, filter: string}, userId: string, ownerId?: string): Promise<Person[]> {
        return this.personModel.find({
      ...formatFilterSearch(filter),
      ownerId, 
      _deletedAt: null
    }).populate('tagId').populate('professions.jobId')
    .skip(page * limit)
    .limit(limit)
    .exec();
      }

      async count(filter: string, userId: string, ownerId?: string): Promise<number> {
        return this.personModel.find({
          ...formatFilterSearch(filter),
          ownerId, 
          _deletedAt: null
        })
          .countDocuments()
          .exec()
      }

      async findOne(id: string, ownerId?: string): Promise<Person> {
        const person = await this.personModel.findById(id).exec();
        if (!person) {
          throw new Error(`Person with id ${id} not found`);
        }
        return person;
      }

      async update(id: string, updatePersonDto: CreatePersonDto): Promise<Person> {
        const updatedPerson = await this.personModel.findByIdAndUpdate(id, updatePersonDto, { new: true });
        if (!updatedPerson) {
          throw new Error(`Person with id ${id} not found`);
        }
        return updatedPerson;
      }

      async softRemove(id: string): Promise<Person> {
        const updatedPerson = await this.personModel.findByIdAndUpdate(
          id,
          { _deletedAt: Date.now() },
          { new: true }
        );

        if (!updatedPerson) {
          throw new Error(`Person with id ${id} not found`);
        }

        return updatedPerson;
      }

      async remove(id: string): Promise<Person> {
        const person = await this.personModel.findByIdAndDelete(id);
        if (!person) {
          throw new Error(`Person with id ${id} not found`);
        }
        return person;
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
    