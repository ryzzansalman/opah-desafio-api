import { ApiProperty } from '@nestjs/swagger';


    
export class CreateTagDto {
@ApiProperty()
tagName: string;
@ApiProperty()
tagImage: any[];}

export class TagApiResponseDto {
    @ApiProperty() statusCode: number;
    @ApiProperty() data: CreateTagDto;
    @ApiProperty() message: string;
}

export class TagListDto {
    @ApiProperty({type: [CreateTagDto]}) result: CreateTagDto[];
    @ApiProperty() page: number;
    @ApiProperty() total: number;
}

export class TagListApiResponseDto {
    @ApiProperty() statusCode: number;
    @ApiProperty() data: TagListDto;
    @ApiProperty() message: string;
}
