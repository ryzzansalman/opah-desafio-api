import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { __ProfileRepository } from '../__profile/__profile.repository';
import { __SharingRepository } from '../__sharing/__sharing.repository';
import { __UserRepository } from '../__user/__user.repository';
import { ForgetPassowordDto, ResetPasswordDto } from './dto/reset-password.dto';
import { CollaboratorSigninDto, SigninDto, SigninResponseDto } from './dto/signin.dto';
import { sendForgetPasswordEmailUsecase } from './usecases/send-forget-password-mail.usecase';

@ApiTags('Autentikigo')
@Controller('__auth')
export class __AuthController {

  constructor(
    private readonly __userRepository: __UserRepository,
    private readonly __profileRepository: __ProfileRepository,
    private readonly __sharingRepository: __SharingRepository,
  ) { }

  @Post('signup')
  @ApiBody({ type: SigninDto })
  @ApiResponse({ status: 200, type: SigninResponseDto })
  async signup(
    @Body() signinDto: SigninDto,
  ) {
    try {
      const existingUser = await this.__userRepository.getUserByEmail(signinDto.email);
      if (existingUser) throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);

      const hashedPassword = await bcrypt.hash(signinDto.password, 10);
      const newUser = await this.__userRepository.createUser({ email: signinDto.email, password: hashedPassword });

      await this.__profileRepository.createProfile({
        userId: (newUser as any || existingUser as any)!._id.toString(),
        name: signinDto.email.split('@')[0],
        profileImage: '',
      });

      const userId = (newUser as any || existingUser as any)!._id.toString();
      const ownerId = userId;

      return { authToken: await generateJwt({ userId, ownerId, permission: 'edit' }), userId };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('login')
  @ApiBody({ type: SigninDto })
  @ApiResponse({ status: 200, type: SigninResponseDto })
  async signin(@Body() signinDto: SigninDto) {
    try {
      const existingUser = await this.__userRepository.getUserByEmail(signinDto.email);
      if (!existingUser) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

      const passwordMatch = await bcrypt.compare(signinDto.password, existingUser.password);
      if (!passwordMatch) throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);

      const userId = (existingUser as any)._id.toString();
      const ownerId = userId;

      return { authToken: await generateJwt({ userId, ownerId, permission: 'edit' }), userId };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('collaborator-login')
  @ApiBody({ type: CollaboratorSigninDto })
  @ApiResponse({ status: 200, type: SigninResponseDto })
  async collaboratorSignin(
    @Body() collaboratorSigninDto: CollaboratorSigninDto
  ) {
    try {
      const { userId } = await validateJwt(collaboratorSigninDto.signinToken);
      const ownerId = collaboratorSigninDto.ownerId;
      const existingUser = await this.__userRepository.getUserById(userId);
      if (!existingUser) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

      const shares = await this.__sharingRepository.getShares({ page: 0, limit: 1, filter: { ownerId, collaboratorId: userId } });

      return { authToken: await generateJwt({ userId, ownerId, permission: (shares[0]?.permission ?? '') as string }), userId };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('forget-password')
  @ApiBody({ type: ForgetPassowordDto })
  async forgetPassword(@Body() forgetPassowordDto: ForgetPassowordDto) {
    try {
      const existingUser = await this.__userRepository.getUserByEmail(forgetPassowordDto.email);
      if (!existingUser) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

      const token = await jwt.sign({ email: forgetPassowordDto.email }, process.env.JWT_SECRET ?? 'rapida_x', { expiresIn: '1d' });
      await sendForgetPasswordEmailUsecase(forgetPassowordDto.email, token);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('reset-password')
  @ApiBody({ type: ResetPasswordDto })
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    try {
      const { email } = await validateJwt(resetPasswordDto.forgetPasswordToken);
      const existingUser = await this.__userRepository.getUserByEmail(email);
      if (!existingUser) throw new HttpException('User not found', HttpStatus.BAD_REQUEST);

      const hashedPassword = await bcrypt.hash(resetPasswordDto.newPassword, 10);
      await this.__userRepository.updateUser((existingUser as any)._id.toString(), { password: hashedPassword });
      return { message: 'Password reset successful' };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }
}

const generateJwt = async (
  { userId, ownerId, permission }:
    { userId: string, ownerId: string, permission?: string; }
): Promise<string> => {
  return await jwt.sign({ userId, ownerId, permission }, process.env.JWT_SECRET ?? 'rapida_x');
};

const validateJwt = async (token: string): Promise<any> => {
  return await jwt.verify(token, process.env.JWT_SECRET ?? 'rapida_x');
};
