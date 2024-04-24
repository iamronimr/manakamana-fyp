import { BadRequestException, Injectable } from '@nestjs/common';
import { AddItemToCartDto } from './dto/cart.dto';
import { DataSource } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { Product } from 'src/products/entities/product.entity';
import { CartItem } from './entities/cartItems.entity';

@Injectable()
export class CartService {
  constructor(private readonly dataSource: DataSource) {}
  async addItemToCart(customer_id: string, payload: AddItemToCartDto) {
    const product = await this.dataSource.getRepository(Product).findOne({
      where: {
        id: payload.product_id,
      },
    });

    if (!product) throw new BadRequestException('Product not found.');

    // check if the item is in stock
    if (product.stock === 0)
      throw new BadRequestException('Product out of stock.');

    const [cart, total] = await this.dataSource
      .getRepository(Cart)
      .findAndCount({ where: { customer_id } });

    if (!total) {
      const cart = await this.dataSource
        .getRepository(Cart)
        .save({ customer_id });
      await this.dataSource.getRepository(CartItem).save({
        customer_id,
        cart_id: cart.id,
        ...payload,
      });

      return await this.getCart(customer_id);
    } else {
      const itemExist = await this.dataSource.getRepository(Cart).findOne({
        where: {
          customer_id,
          cart_items: { product_id: product.id },
        },
        relations: ['cart_items'],
      });

      if (itemExist) {
        throw new BadRequestException('Item is already on cart.')
      }
      await this.dataSource.getRepository(CartItem).save({
        cart_id: cart[0].id,
        product_id: payload.product_id,
      });

      return await this.getCart(customer_id);
    }
  }

  async getCart(customer_id: string) {
    const cart = await this.dataSource
      .getRepository(Cart)
      .createQueryBuilder('cart')
      .leftJoin('cart.cart_items', 'cart_items')
      .leftJoin('cart_items.product', 'product')
      .where('cart.customer_id = :customer_id', { customer_id })
      .select([
        'cart.id',
        'cart.customer_id',
        'cart_items.id',
        'cart_items.quantity',
        'product.id',
        'product.productname',
        'product.description',
        'product.photo',
        'product.price',
        'product.category',
        'product.stock',
      ])
      .getOne();

    if (!cart) {
      return null;
    }

    let grand_total= 0;
    for (let i=0; i< cart.cart_items.length; i++){
      grand_total += parseInt(cart.cart_items[i].product.price);
    }
    cart['grand_total']= grand_total

    return cart;
  }

  async deleteItemFromCart(customer_id: string, product_id: string) {
    const isItem = await this.dataSource.getRepository(Cart).findOne({
      where: { customer_id, cart_items: { product_id } },
      relations: ['cart_items'],
    });

    if (!isItem) throw new BadRequestException('Item does not exist in cart.');

    await this.dataSource
      .getRepository(CartItem)
      .delete({ id: isItem.cart_items[0].id });

    return await this.getCart(customer_id);
  }

  async deleteCart(customer_id: string) {
    //Get the cart id from customer id
    const cart = await this.dataSource.getRepository(Cart).findOne({
      where: { customer_id },
      select: ['id'],
    });

    if (!cart) throw new BadRequestException('Cart does not exist.');
    await this.dataSource.getRepository(Cart).delete({ id: cart.id });
    return { message: 'Cart deleted successfully.' };
  }
}
