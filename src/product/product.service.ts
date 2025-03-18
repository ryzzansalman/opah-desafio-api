import { Model } from 'mongoose';
    import { Injectable } from '@nestjs/common';
    import { InjectModel } from '@nestjs/mongoose';
    import { Product } from './product.model';
    import { CreateProductDto } from './dto/create-product.dto';

    @Injectable()
    export class ProductService {
      constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

      async create(createProductDto): Promise<Product> {
        const createdProduct = new this.productModel(createProductDto);
        return createdProduct.save();
      }

      async findAll({page, limit, filter}:{page:number, limit:number, filter: string}, userId: string, ownerId?: string): Promise<Product[]> {
        return this.productModel.find({
      ...formatFilterSearch(filter),
      
      _deletedAt: null
    }).populate('ncmId').populate('companyId').populate('tagId')
    .skip(page * limit)
    .limit(limit)
    .exec();
      }

      async count(filter: string, userId: string, ownerId?: string): Promise<number> {
        return this.productModel.find({
          ...formatFilterSearch(filter),
          
          _deletedAt: null
        })
          .countDocuments()
          .exec()
      }

      async findOne(id: string, ownerId?: string): Promise<Product> {
        const product = await this.productModel.findById(id).exec();
        if (!product) {
          throw new Error(`Product with id ${id} not found`);
        }
        return product;
      }

      async update(id: string, updateProductDto: CreateProductDto): Promise<Product> {
        const updatedProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true });
        if (!updatedProduct) {
          throw new Error(`Product with id ${id} not found`);
        }
        return updatedProduct;
      }

      async softRemove(id: string): Promise<Product> {
        const updatedProduct = await this.productModel.findByIdAndUpdate(
          id,
          { _deletedAt: Date.now() },
          { new: true }
        );

        if (!updatedProduct) {
          throw new Error(`Product with id ${id} not found`);
        }

        return updatedProduct;
      }

      async remove(id: string): Promise<Product> {
        const product = await this.productModel.findByIdAndDelete(id);
        if (!product) {
          throw new Error(`Product with id ${id} not found`);
        }
        return product;
      }
    }

    /**
     * Formats the search filter by removing specified fields.
     *
     * @param filter - The filter to be formatted.
     * @returns The formatted filter.
     */
    const formatFilterSearch = (filter: string) => {
      const fieldsToRemoveFromFilter = ['productPrice', 'minimumStock', 'width', 'height', 'length', 'weight'];
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
    