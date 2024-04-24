import { Module } from '@nestjs/common';
import { CartService } from './carts.service';
import { CartController } from './carts.controller';

@Module({
  providers: [CartService],
  controllers: [CartController]
})
export class CartsModule {}
