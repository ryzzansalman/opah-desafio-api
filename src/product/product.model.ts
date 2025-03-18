import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
		import * as mongoose from 'mongoose';
      
      export type ProductDocument = mongoose.HydratedDocument<Product>;
      
      @Schema({ collection: 'Product', timestamps: true })
      export class Product {
        
      @Prop({  })
      productName: string;
    
      @Prop({  
type: mongoose.Schema.Types.ObjectId, ref: 'Ncm'})
      ncmId: string;
    
      @Prop({  })
      saleMeasure: string;
    
      @Prop({  })
      productImages: any[];
    
      @Prop({  })
      productDescription: string;
    
      @Prop({  
type: mongoose.Schema.Types.ObjectId, ref: 'Company'})
      companyId: string;
    
      @Prop({  })
      model: string;
    
      @Prop({  })
      ean13: string;
    
      @Prop({  })
      ean14: string;
    
      @Prop({  
type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}]})
      tagId: string[];
    
      @Prop({  })
      productPrice: number;
    
      @Prop({  })
      minimumStock: number;
    
      @Prop({  })
      width: number;
    
      @Prop({  })
      height: number;
    
      @Prop({  })
      length: number;
    
      @Prop({  })
      weight: number;
    
      @Prop({  
type: [{productId: {
            type: String
        ,   } 
    , inputQuantity: {
            type: Number
        ,   } 
    , inputComment: {
            type: String
        ,   } 
    , }]})
      inputs: Array<{ 
    productId: string, inputQuantity: number, inputComment: string, 
  }>;
    
      @Prop({  
type: [{otherProperty: {
            type: String
        ,   } 
    , otherValue: {
            type: String
        ,   } 
    , }]})
      othersProperties: Array<{ 
    otherProperty: string, otherValue: string, 
  }>;
    

        @Prop({})
        createdBy: string;

        @Prop({ required: false })
        ownerId: string;

        @Prop({})
        _deletedAt: number;
      }
      
      export const ProductSchema = SchemaFactory.createForClass(Product);
      