import { ApiProperty } from '@nestjs/swagger';

export class CreateSharingDto {
  @ApiProperty()
  ownerId: string;

  @ApiProperty()
  collaboratorId: string;

  @ApiProperty()
  permission: string;
}

export class SharingResponseDto extends CreateSharingDto {
  @ApiProperty()
  _id: string;
}

export class SharingListResponseDto {
  @ApiProperty({ type: [SharingResponseDto] })
  result: SharingResponseDto[];

  @ApiProperty()
  page: number;

  @ApiProperty()
  total: number;
}

