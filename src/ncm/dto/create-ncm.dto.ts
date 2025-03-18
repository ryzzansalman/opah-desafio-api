import { ApiProperty } from '@nestjs/swagger';


    
export class CreateNcmDto {
@ApiProperty()
ncmCode: string;
@ApiProperty()
ncmDescription: string;
@ApiProperty()
ncmStartDate: string;
@ApiProperty()
ncmFinishDate: string;
@ApiProperty()
initialActType: string;
@ApiProperty()
initialActNumber: string;
@ApiProperty()
initialActYear: string;
@ApiProperty()
importTax: number;
@ApiProperty()
industrializedProductsTax: number;
@ApiProperty()
socialIntegrationProgramTax: number;
@ApiProperty()
socialSecurityFinancingContributionTax: number;
@ApiProperty()
acreIcms: number;
@ApiProperty()
alagoasIcms: number;
@ApiProperty()
amazonasIcms: number;
@ApiProperty()
bahiaIcms: number;
@ApiProperty()
cearaIcms: number;
@ApiProperty()
distritoFederalIcms: number;
@ApiProperty()
espiritoSantoIcms: number;
@ApiProperty()
goiasIcms: number;
@ApiProperty()
maranhaoIcms: number;
@ApiProperty()
matoGrossoIcms: number;
@ApiProperty()
matoGrossoDoSulIcms: number;
@ApiProperty()
minasGeraisIcms: number;
@ApiProperty()
paraIcms: number;
@ApiProperty()
paranaIcms: number;
@ApiProperty()
pernambucoIcms: number;
@ApiProperty()
piauiIcms: number;
@ApiProperty()
rioDeJaneiroIcms: number;
@ApiProperty()
rioGrandeDoNorteIcms: number;
@ApiProperty()
rioGrandeDoSulIcms: number;
@ApiProperty()
rondoniaIcms: number;
@ApiProperty()
roraimaIcms: number;
@ApiProperty()
santaCatarinaIcms: number;
@ApiProperty()
saoPauloIcms: number;
@ApiProperty()
sergipeIcms: number;
@ApiProperty()
tocantinsIcms: number;}

export class NcmApiResponseDto {
    @ApiProperty() statusCode: number;
    @ApiProperty() data: CreateNcmDto;
    @ApiProperty() message: string;
}

export class NcmListDto {
    @ApiProperty({type: [CreateNcmDto]}) result: CreateNcmDto[];
    @ApiProperty() page: number;
    @ApiProperty() total: number;
}

export class NcmListApiResponseDto {
    @ApiProperty() statusCode: number;
    @ApiProperty() data: NcmListDto;
    @ApiProperty() message: string;
}
