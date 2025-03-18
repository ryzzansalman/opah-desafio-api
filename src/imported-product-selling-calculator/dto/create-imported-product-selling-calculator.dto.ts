import { ApiProperty } from '@nestjs/swagger';


export class ProductAmountOtherCostsDto{
@ApiProperty()
productAmountOtherCostsDescription: string;
@ApiProperty()
productAmountOtherCostsValue: number;}
    
export class CreateImportedProductSellingCalculatorDto {
@ApiProperty()
orderTotalWeigth: number;
@ApiProperty()
orderPackagingTotalDimension: number;
@ApiProperty()
freightCurrency: string;
@ApiProperty()
productAmountFreightCost: number;
@ApiProperty()
productId: string;
@ApiProperty()
storageDays: number;
@ApiProperty()
icmsStateApplied: string;
@ApiProperty()
productCurrency: string;
@ApiProperty()
productBuyingUnitaryPrice: number;
@ApiProperty()
productBuyingQuantity: number;
@ApiProperty()
productPackagingTotalDimension: number;
@ApiProperty()
productTotalWeight: number;
@ApiProperty()
insuranceCurrency: string;
@ApiProperty()
productAmountInsuranceCost: number;
@ApiProperty({type: [ProductAmountOtherCostsDto]})
productAmountOtherCosts: ProductAmountOtherCostsDto[];}

export class ImportedProductSellingCalculatorApiResponseDto {
    @ApiProperty() statusCode: number;
    @ApiProperty() data: CreateImportedProductSellingCalculatorDto;
    @ApiProperty() message: string;
}

export class ImportedProductSellingCalculatorListDto {
    @ApiProperty({type: [CreateImportedProductSellingCalculatorDto]}) result: CreateImportedProductSellingCalculatorDto[];
    @ApiProperty() page: number;
    @ApiProperty() total: number;
}

export class ImportedProductSellingCalculatorListApiResponseDto {
    @ApiProperty() statusCode: number;
    @ApiProperty() data: ImportedProductSellingCalculatorListDto;
    @ApiProperty() message: string;
}
