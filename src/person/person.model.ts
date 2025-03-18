import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
		import * as mongoose from 'mongoose';
      
      export type PersonDocument = mongoose.HydratedDocument<Person>;
      
      @Schema({ collection: 'Person', timestamps: true })
      export class Person {
        
      @Prop({  })
      personName: string;
    
      @Prop({  })
      personNickname: string;
    
      @Prop({  })
      gender: string;
    
      @Prop({  })
      birthday: string;
    
      @Prop({  })
      personDescription: string;
    
      @Prop({  })
      maritalStatus: string;
    
      @Prop({  })
      motherName: string;
    
      @Prop({  })
      fatherName: string;
    
      @Prop({  
type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}]})
      tagId: string[];
    
      @Prop({  })
      cpf: string;
    
      @Prop({  })
      cpfFile: any[];
    
      @Prop({  })
      rg: string;
    
      @Prop({  })
      rgIssuingAuthority: string;
    
      @Prop({  })
      rgIssuanceDate: string;
    
      @Prop({  })
      rgState: string;
    
      @Prop({  })
      rgFile: any[];
    
      @Prop({  })
      passport: string;
    
      @Prop({  })
      passportIssuanceDate: string;
    
      @Prop({  })
      passportExpirationDate: string;
    
      @Prop({  })
      passportFile: any[];
    
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
    
      @Prop({  
type: [{jobId: 
{type: mongoose.Schema.Types.ObjectId, ref: 'Job'} 
    , jobStartDateMonth: {
            type: Number
        ,   } 
    , jobStartDateYear: {
            type: Number
        ,   } 
    , jobFinishDateYear: {
            type: Number
        ,   } 
    , jobFinishDateMonth: {
            type: Number
        ,   } 
    , jobDescription: {
            type: String
        ,   } 
    , }]})
      professions: Array<{ 
    jobId: string, jobStartDateMonth: number, jobStartDateYear: number, jobFinishDateYear: number, jobFinishDateMonth: number, jobDescription: string, 
  }>;
    
      @Prop({  })
      personEducation: string;
    
      @Prop({  
type: [{personEducationCourse: {
            type: String
        ,   } 
    , personEducationInstitution: {
            type: String
        ,   } 
    , personEducationStartDate: {
            type: String
        ,   } 
    , personEducationFinishDate: {
            type: String
        ,   } 
    , personEducationDescription: {
            type: String
        ,   } 
    , personEducationCertificateFile: { type: Array } 
    , }]})
      personEducations: Array<{ 
    personEducationCourse: string, personEducationInstitution: string, personEducationStartDate: string, personEducationFinishDate: string, personEducationDescription: string, personEducationCertificateFile: any[], 
  }>;
    
      @Prop({  
type: [{personCourseName: {
            type: String
        ,   } 
    , personCourseInstitution: {
            type: String
        ,   } 
    , personCourseStartDate: {
            type: String
        ,   } 
    , personCourseFinishDate: {
            type: String
        ,   } 
    , personCourseDescription: {
            type: String
        ,   } 
    , personCourseCertificateFile: { type: Array } 
    , }]})
      personCourses: Array<{ 
    personCourseName: string, personCourseInstitution: string, personCourseStartDate: string, personCourseFinishDate: string, personCourseDescription: string, personCourseCertificateFile: any[], 
  }>;
    
      @Prop({  })
      personLanguages: string;
    
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
      
      export const PersonSchema = SchemaFactory.createForClass(Person);
      