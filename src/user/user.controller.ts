import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { GetUser } from 'src/@decoraters/getUser.decorater';
import { User, UserType } from './entities/user.entity';
import { ChangePasswordDto } from './dto/user.dto';
import { JwtAuthGuard } from 'src/@guards/jwt.guard';
import { RolesGuard } from 'src/@guards/roles.guard';
import { Roles } from 'src/@decoraters/getRoles.decorater';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/change-password')
  changePassword(
    @GetUser() user: User,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    return this.userService.changePassword(user, changePasswordDto);
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  getUsersdetails(@GetUser() user: User) {
    return user;
  }

  @Get()
  getUsers(){
      return this.userService.getUsers();
  }

  @Delete('/:id')
  deleteUser(@Param('id', new ParseUUIDPipe())id: string){
      return this.userService.deleteUserById(id);
  }

}
