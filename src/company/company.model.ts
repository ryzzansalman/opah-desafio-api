import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
		import * as mongoose from 'mongoose';
      
      export type CompanyDocument = mongoose.HydratedDocument<Company>;
      
      @Schema({ collection: 'Company', timestamps: true })
      export class Company {
        
      @Prop({  })
      cnpj: string;
    
      @Prop({  })
      companyName: string;
    
      @Prop({  })
      businessName: string;
    
      @Prop({  })
      birthday: string;
    
      @Prop({  })
      legalNature: string;
    
      @Prop({  })
      companyDescription: string;
    
      @Prop({  })
      logoImage: any[];
    
      @Prop({  })
      companyImages: any[];
    
      @Prop({  
type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}]})
      tagId: string[];
    
      @Prop({  
type: [{personId: 
{type: mongoose.Schema.Types.ObjectId, ref: 'Person'} 
    , }]})
      partners: Array<{ 
    personId: string, 
  }>;
    
      @Prop({  })
      phoneNumberOne: string;
    
      @Prop({  })
      phoneNumberTwo: string;
    
      @Prop({  })
      emailOne: string;
    
      @Prop({  })
      emailTwo: string;
    
      @Prop({  })
      linkedin: string;
    
      @Prop({  })
      instagram: string;
    
      @Prop({  })
      facebook: string;
    
      @Prop({  })
      x: string;
    
      @Prop({  })
      addressOneCepBrasilApi: string;
    
      @Prop({  })
      addressOneType: string;
    
      @Prop({  })
      addressOneStreet: string;
    
      @Prop({  })
      addressOneNumber: string;
    
      @Prop({  })
      addressOneComplement: string;
    
      @Prop({  })
      addressOneCity: string;
    
      @Prop({  })
      addressOneState: string;
    
      @Prop({  })
      addressTwoCepBrasilApi: string;
    
      @Prop({  })
      addressTwoType: string;
    
      @Prop({  })
      addressTwoStreet: string;
    
      @Prop({  })
      addressTwoNumber: string;
    
      @Prop({  })
      addressTwoComplement: string;
    
      @Prop({  })
      addressTwoCity: string;
    
      @Prop({  })
      addressTwoState: string;
    
      @Prop({  })
      bankDataBankNameOne: string;
    
      @Prop({  })
      bankDataBankBranchOne: string;
    
      @Prop({  })
      bankDataBankAccountOne: string;
    
      @Prop({  })
      bankDataBankAccountTypeOne: string;
    
      @Prop({  })
      bankDataBankNameTwo: string;
    
      @Prop({  })
      bankDataBankBranchTwo: string;
    
      @Prop({  })
      bankDataBankAccountTwo: string;
    
      @Prop({  })
      bankDataBankAccountTypeTwo: string;
    
      @Prop({  
type: [{filesDescription: {
            type: String
        ,   } 
    , relatedFilesFiles: { type: Array } 
    , relatedFilesDateDay: {
            type: Number
        ,   } 
    , relatedFilesDateMonth: {
            type: Number
        ,   } 
    , relatedFilesDateYear: {
            type: Number
        ,   } 
    , }]})
      relatedFiles: Array<{ 
    filesDescription: string, relatedFilesFiles: any[], relatedFilesDateDay: number, relatedFilesDateMonth: number, relatedFilesDateYear: number, 
  }>;
    

        @Prop({})
        createdBy: string;

        @Prop({ required: false })
        ownerId: string;

        @Prop({})
        _deletedAt: number;
      }
      
      export const CompanySchema = SchemaFactory.createForClass(Company);
      