import { Model } from 'mongoose';
    import { Injectable } from '@nestjs/common';
    import { InjectModel } from '@nestjs/mongoose';
    import { ImportedProductSellingCalculator } from './imported-product-selling-calculator.model';
    import { CreateImportedProductSellingCalculatorDto } from './dto/create-imported-product-selling-calculator.dto';

    @Injectable()
    export class ImportedProductSellingCalculatorService {
      constructor(@InjectModel(ImportedProductSellingCalculator.name) private importedProductSellingCalculatorModel: Model<ImportedProductSellingCalculator>) {}

      async create(createImportedProductSellingCalculatorDto): Promise<ImportedProductSellingCalculator> {
        const createdImportedProductSellingCalculator = new this.importedProductSellingCalculatorModel(createImportedProductSellingCalculatorDto);
        return createdImportedProductSellingCalculator.save();
      }

      async findAll({page, limit, filter}:{page:number, limit:number, filter: string}, userId: string, ownerId?: string): Promise<ImportedProductSellingCalculator[]> {
        return this.importedProductSellingCalculatorModel.find({
      ...formatFilterSearch(filter),
      ownerId, 
      _deletedAt: null
    })
    .skip(page * limit)
    .limit(limit)
    .exec();
      }

      async count(filter: string, userId: string, ownerId?: string): Promise<number> {
        return this.importedProductSellingCalculatorModel.find({
          ...formatFilterSearch(filter),
          ownerId, 
          _deletedAt: null
        })
          .countDocuments()
          .exec()
      }

      async findOne(id: string, ownerId?: string): Promise<ImportedProductSellingCalculator> {
        const importedProductSellingCalculator = await this.importedProductSellingCalculatorModel.findById(id).exec();
        if (!importedProductSellingCalculator) {
          throw new Error(`ImportedProductSellingCalculator with id ${id} not found`);
        }
        return importedProductSellingCalculator;
      }

      async update(id: string, updateImportedProductSellingCalculatorDto: CreateImportedProductSellingCalculatorDto): Promise<ImportedProductSellingCalculator> {
        const updatedImportedProductSellingCalculator = await this.importedProductSellingCalculatorModel.findByIdAndUpdate(id, updateImportedProductSellingCalculatorDto, { new: true });
        if (!updatedImportedProductSellingCalculator) {
          throw new Error(`ImportedProductSellingCalculator with id ${id} not found`);
        }
        return updatedImportedProductSellingCalculator;
      }

      async softRemove(id: string): Promise<ImportedProductSellingCalculator> {
        const updatedImportedProductSellingCalculator = await this.importedProductSellingCalculatorModel.findByIdAndUpdate(
          id,
          { _deletedAt: Date.now() },
          { new: true }
        );

        if (!updatedImportedProductSellingCalculator) {
          throw new Error(`ImportedProductSellingCalculator with id ${id} not found`);
        }

        return updatedImportedProductSellingCalculator;
      }

      async remove(id: string): Promise<ImportedProductSellingCalculator> {
        const importedProductSellingCalculator = await this.importedProductSellingCalculatorModel.findByIdAndDelete(id);
        if (!importedProductSellingCalculator) {
          throw new Error(`ImportedProductSellingCalculator with id ${id} not found`);
        }
        return importedProductSellingCalculator;
      }
    }

    /**
     * Formats the search filter by removing specified fields.
     *
     * @param filter - The filter to be formatted.
     * @returns The formatted filter.
     */
    const formatFilterSearch = (filter: string) => {
      const fieldsToRemoveFromFilter = ['orderTotalWeigth', 'orderPackagingTotalDimension', 'productAmountFreightCost', 'storageDays', 'productBuyingUnitaryPrice', 'productBuyingQuantity', 'productPackagingTotalDimension', 'productTotalWeight', 'productAmountInsuranceCost'];
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
    