import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
		import * as mongoose from 'mongoose';
      
      export type ImportedProductSellingCalculatorDocument = mongoose.HydratedDocument<ImportedProductSellingCalculator>;
      
      @Schema({ collection: 'ImportedProductSellingCalculator', timestamps: true })
      export class ImportedProductSellingCalculator {
        
      @Prop({  })
      orderTotalWeigth: number;
    
      @Prop({  })
      orderPackagingTotalDimension: number;
    
      @Prop({  })
      freightCurrency: string;
    
      @Prop({  })
      productAmountFreightCost: number;
    
      @Prop({  })
      productId: string;
    
      @Prop({  })
      storageDays: number;
    
      @Prop({  })
      icmsStateApplied: string;
    
      @Prop({  })
      productCurrency: string;
    
      @Prop({  })
      productBuyingUnitaryPrice: number;
    
      @Prop({  })
      productBuyingQuantity: number;
    
      @Prop({  })
      productPackagingTotalDimension: number;
    
      @Prop({  })
      productTotalWeight: number;
    
      @Prop({  })
      insuranceCurrency: string;
    
      @Prop({  })
      productAmountInsuranceCost: number;
    
      @Prop({  
type: [{productAmountOtherCostsDescription: {
            type: String
        ,   } 
    , productAmountOtherCostsValue: {
            type: Number
        ,   } 
    , }]})
      productAmountOtherCosts: Array<{ 
    productAmountOtherCostsDescription: string, productAmountOtherCostsValue: number, 
  }>;
    

        @Prop({})
        createdBy: string;

        @Prop({ required: false })
        ownerId: string;

        @Prop({})
        _deletedAt: number;
      }
      
      export const ImportedProductSellingCalculatorSchema = SchemaFactory.createForClass(ImportedProductSellingCalculator);
      