import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/@decoraters/getRoles.decorater';
import { UserType } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from 'src/@guards/jwt.guard';
import { RolesGuard } from 'src/@guards/roles.guard';
import { GetUser } from 'src/@decoraters/getUser.decorater';
import { AddItemToCartDto } from './dto/cart.dto';
import { CartService } from './carts.service';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.CUSTOMER)
  addItemToCart(
    @GetUser('id') customer_id: string,
    @Body() payload: AddItemToCartDto,
  ) {
    return this.cartService.addItemToCart(customer_id, payload);
  }

  @Get('my-cart')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.CUSTOMER)
  getCart(@GetUser('id') customer_id: string) {
    return this.cartService.getCart(customer_id);
  }

  @Delete('product/:product_id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.CUSTOMER)
  deleteItemFromCart(
    @GetUser('id') customer_id: string,
    @Param('product_id', ParseUUIDPipe) product_id: string,
  ) {
    return this.cartService.deleteItemFromCart(customer_id, product_id);
  }

  // ---------- DELETE CART -------------

  @Delete()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserType.CUSTOMER)
  deleteCart(@GetUser('id') customer_id: string) {
    return this.cartService.deleteCart(customer_id);
  }
}
