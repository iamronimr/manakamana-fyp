import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { BookService } from './book.service';
import { JwtAuthGuard } from 'src/@guards/jwt.guard';
import { RolesGuard } from 'src/@guards/roles.guard';
import { Roles } from 'src/@decoraters/getRoles.decorater';
import { UserType } from 'src/user/entities/user.entity';
import { GetUser } from 'src/@decoraters/getUser.decorater';

@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService){}

    // Pay & Book
  @Post('checkout')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.CUSTOMER)
  makePayment(
    @GetUser('id') customer_id: string,
  ) {
    return this.bookService.checkOut(customer_id);
  }
}

