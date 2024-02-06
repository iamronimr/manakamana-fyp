import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateUserDTO } from './dto/auth.dto';
import { User } from 'src/user/entities/user.entity';
import * as argon from 'argon2';
import { OtpService } from 'src/otp/otp.service';
import { OTPType } from 'src/otp/entities/otp.entity';
import { sendMail } from 'src/@utils/mail';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataSource: DataSource,
    private otpService: OtpService,
  ) {}

  async registerUser(payload: CreateUserDTO) {
    const user = await this.dataSource
      .getRepository(User)
      .findOne({ where: { email: payload.email } });
    if (user) {
      throw new BadRequestException('The user already exsts.');
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

    return savedUser;
  }
}
