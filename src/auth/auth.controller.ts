import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('create-user')
  registerUser(@Body() createUserDto: CreateUserDTO) {
    return this.authService.registerUser(createUserDto);
  }
}
