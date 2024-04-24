import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './book.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity({ name: 'booked_product' })
export class BookedProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
 product_id: string;
  @ManyToOne(() => Product, (item) => item.booked_product, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column()
  booked_id: string;
  @ManyToOne(() => Book, (book) => book.booked_product, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'booked_id' })
  book: Book;
}