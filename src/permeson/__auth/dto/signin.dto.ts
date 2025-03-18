import { ApiProperty } from '@nestjs/swagger';
export class SigninDto {
  @ApiProperty() 
  email: string;
  
  @ApiProperty() 
  password: string;
}

export class CollaboratorSigninDto {
  @ApiProperty() 
  signinToken: string;
  
  @ApiProperty() 
  ownerId: string;
}

export class SigninResponseDto {
  @ApiProperty() 
  authToken: string;

  @ApiProperty() 
  user: string;
}