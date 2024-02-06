import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateUserDTO,
  ForgotPasswordDto,
  ForgotPasswordRequestDto,
  LoginUserDTO,
  ResendEmailVerificationOTPDto,
  VerifyAccountDto,
} from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create-user')
  registerUser(@Body() createUserDto: CreateUserDTO) {
    return this.authService.registerUser(createUserDto);
  }

  @Post('verify')
  verifyOtp(@Body() payload: VerifyAccountDto) {
    return this.authService.verifyAccount(payload);
  }

  @Post('login')
  loginUser(@Body() payload: LoginUserDTO) {
    return this.authService.loginUser(payload);
  }

  @Post('/resend')
  resendEmailVerification(@Body() payload: ResendEmailVerificationOTPDto) {
    return this.authService.resendEmailVerificationOTP(payload);
  }

  @Post('/reset-request')
  resetRequest(@Body() payload: ForgotPasswordRequestDto) {
    return this.authService.requestForgetPassword(payload);
  }

  // ________________RESET PASSWORD ____________________

  @Patch('/reset')
  resetPassword(@Body() payload: ForgotPasswordDto) {
    return this.authService.forgotPassword(payload);
  }
}
