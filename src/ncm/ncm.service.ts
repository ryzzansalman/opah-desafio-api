import { Model } from 'mongoose';
    import { Injectable } from '@nestjs/common';
    import { InjectModel } from '@nestjs/mongoose';
    import { Ncm } from './ncm.model';
    import { CreateNcmDto } from './dto/create-ncm.dto';

    @Injectable()
    export class NcmService {
      constructor(@InjectModel(Ncm.name) private ncmModel: Model<Ncm>) {}

      async create(createNcmDto): Promise<Ncm> {
        const createdNcm = new this.ncmModel(createNcmDto);
        return createdNcm.save();
      }

      async findAll({page, limit, filter}:{page:number, limit:number, filter: string}, userId: string, ownerId?: string): Promise<Ncm[]> {
        return this.ncmModel.find({
      ...formatFilterSearch(filter),
      
      _deletedAt: null
    })
    .skip(page * limit)
    .limit(limit)
    .exec();
      }

      async count(filter: string, userId: string, ownerId?: string): Promise<number> {
        return this.ncmModel.find({
          ...formatFilterSearch(filter),
          
          _deletedAt: null
        })
          .countDocuments()
          .exec()
      }

      async findOne(id: string, ownerId?: string): Promise<Ncm> {
        const ncm = await this.ncmModel.findById(id).exec();
        if (!ncm) {
          throw new Error(`Ncm with id ${id} not found`);
        }
        return ncm;
      }

      async update(id: string, updateNcmDto: CreateNcmDto): Promise<Ncm> {
        const updatedNcm = await this.ncmModel.findByIdAndUpdate(id, updateNcmDto, { new: true });
        if (!updatedNcm) {
          throw new Error(`Ncm with id ${id} not found`);
        }
        return updatedNcm;
      }

      async softRemove(id: string): Promise<Ncm> {
        const updatedNcm = await this.ncmModel.findByIdAndUpdate(
          id,
          { _deletedAt: Date.now() },
          { new: true }
        );

        if (!updatedNcm) {
          throw new Error(`Ncm with id ${id} not found`);
        }

        return updatedNcm;
      }

      async remove(id: string): Promise<Ncm> {
        const ncm = await this.ncmModel.findByIdAndDelete(id);
        if (!ncm) {
          throw new Error(`Ncm with id ${id} not found`);
        }
        return ncm;
      }
    }

    /**
     * Formats the search filter by removing specified fields.
     *
     * @param filter - The filter to be formatted.
     * @returns The formatted filter.
     */
    const formatFilterSearch = (filter: string) => {
      const fieldsToRemoveFromFilter = ['importTax', 'industrializedProductsTax', 'socialIntegrationProgramTax', 'socialSecurityFinancingContributionTax', 'acreIcms', 'alagoasIcms', 'amazonasIcms', 'bahiaIcms', 'cearaIcms', 'distritoFederalIcms', 'espiritoSantoIcms', 'goiasIcms', 'maranhaoIcms', 'matoGrossoIcms', 'matoGrossoDoSulIcms', 'minasGeraisIcms', 'paraIcms', 'paranaIcms', 'pernambucoIcms', 'piauiIcms', 'rioDeJaneiroIcms', 'rioGrandeDoNorteIcms', 'rioGrandeDoSulIcms', 'rondoniaIcms', 'roraimaIcms', 'santaCatarinaIcms', 'saoPauloIcms', 'sergipeIcms', 'tocantinsIcms'];
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
    