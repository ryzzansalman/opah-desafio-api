import { Model } from 'mongoose';
    import { Injectable } from '@nestjs/common';
    import { InjectModel } from '@nestjs/mongoose';
    import { Company } from './company.model';
    import { CreateCompanyDto } from './dto/create-company.dto';

    @Injectable()
    export class CompanyService {
      constructor(@InjectModel(Company.name) private companyModel: Model<Company>) {}

      async create(createCompanyDto): Promise<Company> {
        const createdCompany = new this.companyModel(createCompanyDto);
        return createdCompany.save();
      }

      async findAll({page, limit, filter}:{page:number, limit:number, filter: string}, userId: string, ownerId?: string): Promise<Company[]> {
        return this.companyModel.find({
      ...formatFilterSearch(filter),
      ownerId, 
      _deletedAt: null
    }).populate('tagId').populate('partners.personId')
    .skip(page * limit)
    .limit(limit)
    .exec();
      }

      async count(filter: string, userId: string, ownerId?: string): Promise<number> {
        return this.companyModel.find({
          ...formatFilterSearch(filter),
          ownerId, 
          _deletedAt: null
        })
          .countDocuments()
          .exec()
      }

      async findOne(id: string, ownerId?: string): Promise<Company> {
        const company = await this.companyModel.findById(id).exec();
        if (!company) {
          throw new Error(`Company with id ${id} not found`);
        }
        return company;
      }

      async update(id: string, updateCompanyDto: CreateCompanyDto): Promise<Company> {
        const updatedCompany = await this.companyModel.findByIdAndUpdate(id, updateCompanyDto, { new: true });
        if (!updatedCompany) {
          throw new Error(`Company with id ${id} not found`);
        }
        return updatedCompany;
      }

      async softRemove(id: string): Promise<Company> {
        const updatedCompany = await this.companyModel.findByIdAndUpdate(
          id,
          { _deletedAt: Date.now() },
          { new: true }
        );

        if (!updatedCompany) {
          throw new Error(`Company with id ${id} not found`);
        }

        return updatedCompany;
      }

      async remove(id: string): Promise<Company> {
        const company = await this.companyModel.findByIdAndDelete(id);
        if (!company) {
          throw new Error(`Company with id ${id} not found`);
        }
        return company;
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
    