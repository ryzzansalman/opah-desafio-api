import { ApiProperty } from '@nestjs/swagger';
export class CreateProfileDto {
  @ApiProperty() 
  name: string;
  
  @ApiProperty() 
  profileImage?: string;
  
  @ApiProperty() 
  userId: string;
}

export class ProfileResponseDto extends CreateProfileDto {
  @ApiProperty() 
  _id: string;
}

export class ProfileListResponseDto {
  @ApiProperty({ type: [ProfileResponseDto] }) 
  result: ProfileResponseDto[];
  
  @ApiProperty() 
  page: number;
  
  @ApiProperty() 
  total: number;
}