import { ApiProperty } from '@nestjs/swagger';


export class PartnersDto{
@ApiProperty()
personId: string;}
export class RelatedFilesDto{
@ApiProperty()
filesDescription: string;
@ApiProperty()
relatedFilesFiles: any[];
@ApiProperty()
relatedFilesDateDay: number;
@ApiProperty()
relatedFilesDateMonth: number;
@ApiProperty()
relatedFilesDateYear: number;}
    
export class CreateCompanyDto {
@ApiProperty()
cnpj: string;
@ApiProperty()
companyName: string;
@ApiProperty()
businessName: string;
@ApiProperty()
birthday: string;
@ApiProperty()
legalNature: string;
@ApiProperty()
companyDescription: string;
@ApiProperty()
logoImage: any[];
@ApiProperty()
companyImages: any[];
@ApiProperty()
tagId: string[];
@ApiProperty({type: [PartnersDto]})
partners: PartnersDto[];
@ApiProperty()
phoneNumberOne: string;
@ApiProperty()
phoneNumberTwo: string;
@ApiProperty()
emailOne: string;
@ApiProperty()
emailTwo: string;
@ApiProperty()
linkedin: string;
@ApiProperty()
instagram: string;
@ApiProperty()
facebook: string;
@ApiProperty()
x: string;
@ApiProperty()
addressOneCepBrasilApi: string;
@ApiProperty()
addressOneType: string;
@ApiProperty()
addressOneStreet: string;
@ApiProperty()
addressOneNumber: string;
@ApiProperty()
addressOneComplement: string;
@ApiProperty()
addressOneCity: string;
@ApiProperty()
addressOneState: string;
@ApiProperty()
addressTwoCepBrasilApi: string;
@ApiProperty()
addressTwoType: string;
@ApiProperty()
addressTwoStreet: string;
@ApiProperty()
addressTwoNumber: string;
@ApiProperty()
addressTwoComplement: string;
@ApiProperty()
addressTwoCity: string;
@ApiProperty()
addressTwoState: string;
@ApiProperty()
bankDataBankNameOne: string;
@ApiProperty()
bankDataBankBranchOne: string;
@ApiProperty()
bankDataBankAccountOne: string;
@ApiProperty()
bankDataBankAccountTypeOne: string;
@ApiProperty()
bankDataBankNameTwo: string;
@ApiProperty()
bankDataBankBranchTwo: string;
@ApiProperty()
bankDataBankAccountTwo: string;
@ApiProperty()
bankDataBankAccountTypeTwo: string;
@ApiProperty({type: [RelatedFilesDto]})
relatedFiles: RelatedFilesDto[];}

export class CompanyApiResponseDto {
    @ApiProperty() statusCode: number;
    @ApiProperty() data: CreateCompanyDto;
    @ApiProperty() message: string;
}

export class CompanyListDto {
    @ApiProperty({type: [CreateCompanyDto]}) result: CreateCompanyDto[];
    @ApiProperty() page: number;
    @ApiProperty() total: number;
}

export class CompanyListApiResponseDto {
    @ApiProperty() statusCode: number;
    @ApiProperty() data: CompanyListDto;
    @ApiProperty() message: string;
}
