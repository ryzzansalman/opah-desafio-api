import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
    @ApiProperty({ required: true })
    newPassword: string;

    @ApiProperty({ required: true })
    forgetPasswordToken: string;
}

export class ForgetPassowordDto {
    @ApiProperty({ required: true })
    email: string;
}