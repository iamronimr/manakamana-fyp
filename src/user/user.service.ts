import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import * as argon from 'argon2';
import { ChangePasswordDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private readonly dataSource: DataSource) {}

  async changePassword(user: User, payload: ChangePasswordDto) {
    const { oldPassword, newPassword, confirmPassword } = payload;
    //  -----------------Get user by id-------------------
    const getuserbyId = await this.dataSource
      .getRepository(User)
      .findOne({ where: { id: user.id }, select: ['password'] });
    if (!getuserbyId) {
      throw new BadRequestException('User not found');
    }
    if (!(await argon.verify(getuserbyId.password, oldPassword))) {
      throw new BadRequestException('Password do not match');
    }
    if (newPassword !== confirmPassword) {
      throw new UnauthorizedException('Passowrd do not match');
    }
    //  -----------------Hashing new password-------------------
    const bcryptPassword = await argon.hash(newPassword);
    await this.dataSource
      .getRepository(User)
      .update(user.id, { password: bcryptPassword });

    return { message: 'Password Change Sucessfully..' };
  }
}
