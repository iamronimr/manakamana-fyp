import { BookedProduct } from "src/book/entities/booked.entity";
import { CartItem } from "src/carts/entities/cartItems.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'products'})
export class Product{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    productname: string
   
    @Column()
    category: string
   
    @Column()
    description: string

    @Column()
    price: string;

    @Column({default:0})
    stock: number;

    @Column()
    photo: string;

    @OneToMany(() => CartItem, (cart_item) => cart_item.product, { cascade: true })
  cart_item: CartItem[];

  @OneToMany(() => BookedProduct, (cart_item) => cart_item.product, { cascade: true })
  booked_product: BookedProduct[];
}