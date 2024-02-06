import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { UserType } from 'src/user/entities/user.entity';

export class CreateUserDTO {
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @IsEnum(UserType)
  @IsIn([UserType.ADMIN, UserType.CUSTOMER])
  user_type: UserType;
}

export class LoginUserDTO {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
