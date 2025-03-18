import { ApiProperty } from '@nestjs/swagger';


export class InputsDto{
@ApiProperty()
productId: string;
@ApiProperty()
inputQuantity: number;
@ApiProperty()
inputComment: string;}
export class OthersPropertiesDto{
@ApiProperty()
otherProperty: string;
@ApiProperty()
otherValue: string;}
    
export class CreateProductDto {
@ApiProperty()
productName: string;
@ApiProperty()
ncmId: string;
@ApiProperty()
saleMeasure: string;
@ApiProperty()
productImages: any[];
@ApiProperty()
productDescription: string;
@ApiProperty()
companyId: string;
@ApiProperty()
model: string;
@ApiProperty()
ean13: string;
@ApiProperty()
ean14: string;
@ApiProperty()
tagId: string[];
@ApiProperty()
productPrice: number;
@ApiProperty()
minimumStock: number;
@ApiProperty()
width: number;
@ApiProperty()
height: number;
@ApiProperty()
length: number;
@ApiProperty()
weight: number;
@ApiProperty({type: [InputsDto]})
inputs: InputsDto[];
@ApiProperty({type: [OthersPropertiesDto]})
othersProperties: OthersPropertiesDto[];}

export class ProductApiResponseDto {
    @ApiProperty() statusCode: number;
    @ApiProperty() data: CreateProductDto;
    @ApiProperty() message: string;
}

export class ProductListDto {
    @ApiProperty({type: [CreateProductDto]}) result: CreateProductDto[];
    @ApiProperty() page: number;
    @ApiProperty() total: number;
}

export class ProductListApiResponseDto {
    @ApiProperty() statusCode: number;
    @ApiProperty() data: ProductListDto;
    @ApiProperty() message: string;
}
