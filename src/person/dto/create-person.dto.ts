import { ApiProperty } from '@nestjs/swagger';


export class ProfessionsDto{
@ApiProperty()
jobId: string;
@ApiProperty()
jobStartDateMonth: number;
@ApiProperty()
jobStartDateYear: number;
@ApiProperty()
jobFinishDateYear: number;
@ApiProperty()
jobFinishDateMonth: number;
@ApiProperty()
jobDescription: string;}
export class PersonEducationsDto{
@ApiProperty()
personEducationCourse: string;
@ApiProperty()
personEducationInstitution: string;
@ApiProperty()
personEducationStartDate: string;
@ApiProperty()
personEducationFinishDate: string;
@ApiProperty()
personEducationDescription: string;
@ApiProperty()
personEducationCertificateFile: any[];}
export class PersonCoursesDto{
@ApiProperty()
personCourseName: string;
@ApiProperty()
personCourseInstitution: string;
@ApiProperty()
personCourseStartDate: string;
@ApiProperty()
personCourseFinishDate: string;
@ApiProperty()
personCourseDescription: string;
@ApiProperty()
personCourseCertificateFile: any[];}
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
    
export class CreatePersonDto {
@ApiProperty()
personName: string;
@ApiProperty()
personNickname: string;
@ApiProperty()
gender: string;
@ApiProperty()
birthday: string;
@ApiProperty()
personDescription: string;
@ApiProperty()
maritalStatus: string;
@ApiProperty()
motherName: string;
@ApiProperty()
fatherName: string;
@ApiProperty()
tagId: string[];
@ApiProperty()
cpf: string;
@ApiProperty()
cpfFile: any[];
@ApiProperty()
rg: string;
@ApiProperty()
rgIssuingAuthority: string;
@ApiProperty()
rgIssuanceDate: string;
@ApiProperty()
rgState: string;
@ApiProperty()
rgFile: any[];
@ApiProperty()
passport: string;
@ApiProperty()
passportIssuanceDate: string;
@ApiProperty()
passportExpirationDate: string;
@ApiProperty()
passportFile: any[];
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
@ApiProperty({type: [ProfessionsDto]})
professions: ProfessionsDto[];
@ApiProperty()
personEducation: string;
@ApiProperty({type: [PersonEducationsDto]})
personEducations: PersonEducationsDto[];
@ApiProperty({type: [PersonCoursesDto]})
personCourses: PersonCoursesDto[];
@ApiProperty()
personLanguages: string;
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

export class PersonApiResponseDto {
    @ApiProperty() statusCode: number;
    @ApiProperty() data: CreatePersonDto;
    @ApiProperty() message: string;
}

export class PersonListDto {
    @ApiProperty({type: [CreatePersonDto]}) result: CreatePersonDto[];
    @ApiProperty() page: number;
    @ApiProperty() total: number;
}

export class PersonListApiResponseDto {
    @ApiProperty() statusCode: number;
    @ApiProperty() data: PersonListDto;
    @ApiProperty() message: string;
}
