import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
		import * as mongoose from 'mongoose';
      
      export type NcmDocument = mongoose.HydratedDocument<Ncm>;
      
      @Schema({ collection: 'Ncm', timestamps: true })
      export class Ncm {
        
      @Prop({  })
      ncmCode: string;
    
      @Prop({  })
      ncmDescription: string;
    
      @Prop({  })
      ncmStartDate: string;
    
      @Prop({  })
      ncmFinishDate: string;
    
      @Prop({  })
      initialActType: string;
    
      @Prop({  })
      initialActNumber: string;
    
      @Prop({  })
      initialActYear: string;
    
      @Prop({  })
      importTax: number;
    
      @Prop({  })
      industrializedProductsTax: number;
    
      @Prop({  })
      socialIntegrationProgramTax: number;
    
      @Prop({  })
      socialSecurityFinancingContributionTax: number;
    
      @Prop({  })
      acreIcms: number;
    
      @Prop({  })
      alagoasIcms: number;
    
      @Prop({  })
      amazonasIcms: number;
    
      @Prop({  })
      bahiaIcms: number;
    
      @Prop({  })
      cearaIcms: number;
    
      @Prop({  })
      distritoFederalIcms: number;
    
      @Prop({  })
      espiritoSantoIcms: number;
    
      @Prop({  })
      goiasIcms: number;
    
      @Prop({  })
      maranhaoIcms: number;
    
      @Prop({  })
      matoGrossoIcms: number;
    
      @Prop({  })
      matoGrossoDoSulIcms: number;
    
      @Prop({  })
      minasGeraisIcms: number;
    
      @Prop({  })
      paraIcms: number;
    
      @Prop({  })
      paranaIcms: number;
    
      @Prop({  })
      pernambucoIcms: number;
    
      @Prop({  })
      piauiIcms: number;
    
      @Prop({  })
      rioDeJaneiroIcms: number;
    
      @Prop({  })
      rioGrandeDoNorteIcms: number;
    
      @Prop({  })
      rioGrandeDoSulIcms: number;
    
      @Prop({  })
      rondoniaIcms: number;
    
      @Prop({  })
      roraimaIcms: number;
    
      @Prop({  })
      santaCatarinaIcms: number;
    
      @Prop({  })
      saoPauloIcms: number;
    
      @Prop({  })
      sergipeIcms: number;
    
      @Prop({  })
      tocantinsIcms: number;
    

        @Prop({})
        createdBy: string;

        @Prop({ required: false })
        ownerId: string;

        @Prop({})
        _deletedAt: number;
      }
      
      export const NcmSchema = SchemaFactory.createForClass(Ncm);
      