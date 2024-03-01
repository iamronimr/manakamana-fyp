import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import {
  CreateUserDTO,
  ForgotPasswordDto,
  ForgotPasswordRequestDto,
  LoginUserDTO,
  ResendEmailVerificationOTPDto,
  VerifyAccountDto,
} from './dto/auth.dto';
import { User } from 'src/user/entities/user.entity';
import { OtpService } from 'src/otp/otp.service';
import { OTPType } from 'src/otp/entities/otp.entity';
import { sendMail } from 'src/@utils/mail';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/@config/constant';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private otpService: OtpService,
    private jwtService: JwtService,
  ) {}

  async registerUser(payload: CreateUserDTO) {
    const user = await this.dataSource
      .getRepository(User)
      .findOne({ where: { email: payload.email } });
    if (user) {
      throw new BadRequestException('The user already exists.');
    }
    const hashedPassword = await argon.hash(payload.password);
    const newUser = new User();
    newUser.username = payload.username;
    newUser.email = payload.email;
    newUser.password = hashedPassword;
    newUser.user_type = payload.user_type;
    const savedUser = await this.dataSource.getRepository(User).save(newUser);

    const otp = await this.otpService.createOtp(
      savedUser.id,
      OTPType.emailVerification,
    );

    sendMail({
      to: payload.email,
      subject: 'Verify Your Account',
      html: `Your OTP is ${otp.code}`,
    });

    return {message: 'User registered. Check email to verify.'};
  }

  async verifyAccount(payload: VerifyAccountDto) {
    const user = await this.dataSource
      .getRepository(User)
      .findOne({ where: { email: payload.email } });
    if (!user) throw new BadRequestException('Email is not registered.');
    if (user.isVerified)
      throw new BadRequestException('Email is already verified.');

    const isValid = await this.otpService.validateOtp(
      user.id,
      payload.otp,
      OTPType.emailVerification,
    );
    if (!isValid) throw new BadRequestException('Invalid OTP.');

    user.isVerified = true;
    await this.dataSource.getRepository(User).save(user);
    // deleteing otp information after verifying it.
    await this.otpService.deleteOtp(
      user.id,
      payload.otp,
      OTPType.emailVerification,
    );

    return {message: `Account verified for ${user.email}`};
  }

  async loginUser(payload: LoginUserDTO) {
    const { email, password } = payload;
    const user = await this.dataSource.getRepository(User).findOne({
      where: { email },
      select: ['password', 'isVerified', 'user_type'],
    });

    if (!user) {
      throw new BadRequestException({ message: 'Invalid User Credentials' });
    }

    const isValidPassword = await argon.verify(user.password, password);
    if (!isValidPassword) {
      throw new BadRequestException({ message: 'Invalid Password' });
    }

    //Checking whether the account is verified or not

    if (!user.isVerified) {
      throw new BadRequestException({ message: 'Verify your account first' });
    }

    // -------TOKEN Generation
    const token = await this.jwtService.signAsync(
      { sub: user.id, role: user.user_type },
      { expiresIn: '1d', secret: JWT_SECRET },
    );
    return {
      message: 'Logged In Successfully',
      token,
      user_type: user.user_type,
    };
  }

  async resendEmailVerificationOTP(payload: ResendEmailVerificationOTPDto) {
    const { email } = payload;
    const user = await this.dataSource
      .getRepository(User)
      .findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException('The user with the email doesnot exists.');
    }
    if (user.isVerified) {
      throw new BadRequestException('User is already verified.');
    }
    const previousOtp = await this.otpService.findLastOtp(
      user.id,
      OTPType.emailVerification,
    );
    if (previousOtp) {
      const waitTime = 1000 * 60 * 2; //resend after 1 minute
      const completedWaitTime =
        previousOtp.created_at.getTime() + waitTime < Date.now();
      if (!completedWaitTime) {
        throw new BadRequestException(
          `Please wait for ${waitTime / 1000} seconds before resending OTP.`,
        );
      }
    }
    // generate otp now
    const otp = await this.otpService.createOtp(
      user.id,
      OTPType.emailVerification,
    );
    sendMail({
      to: email,
      subject: 'Verify Your Account',
      html: `Your OTP is ${otp.code}`,
    });
    await this.dataSource.getRepository(User).save(user);
    return `OTP resent to email: ${user.email}.`;
  }

  async requestForgetPassword(payload: ForgotPasswordRequestDto) {
    const { email } = payload;
    const user = await this.dataSource
      .getRepository(User)
      .findOne({ where: { email } });
    if (!user) {
      throw new BadRequestException(
        'The user with the following email doesnot exists.',
      );
    }

    //------------------------ Creating new OTP---------------
    const otp = await this.otpService.createOtp(user.id, OTPType.passwordReset);

    //  -------------------------Sended new OTP------------------
    sendMail({
      to: email,
      subject: 'OTP for password reset',
      html: `Your otp for password reset is ${otp.code}`,
    });
    return `Password Reset OTP has been successfully sent to ${user.email}`;
  }

  async forgotPassword(payload: ForgotPasswordDto) {
    const user = await this.dataSource
      .getRepository(User)
      .findOne({ where: { email: payload.email.toLowerCase() } });
    // ---------Checking OTP existance ---------
    if (!user) {
      throw new BadRequestException('User doesnot esxists.');
    }
    await this.verifyOTP({ email: payload.email, otp: payload.code });

    //  -------------Hashing New Password-----------
    user.password = await argon.hash(payload.password);
    await this.dataSource.getRepository(User).save(user);
    await this.otpService.deleteOtp(
      user.id,
      payload.code,
      OTPType.passwordReset,
    );

    return `Password reset Successfully for ${user.email}`;
  }

  async verifyOTP(payload: VerifyAccountDto) {
    const user = await this.dataSource.getRepository(User).findOne({
      where: { email: payload.email.toLowerCase() },
    });
    if (!user) throw new NotFoundException('User not found');

    const isValid = await this.otpService.validateOtp(
      user.id,
      payload.otp,
      OTPType.passwordReset,
    );
    if (!isValid)
      throw new NotFoundException({
        message: 'Invalid OTP',
        valid: false,
      });
    return { message: 'Valid' };
  }
}
