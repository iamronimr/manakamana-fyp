import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BookedProduct } from "./booked.entity";
import { User } from "src/user/entities/user.entity";

@Entity({ name: 'book' })
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => BookedProduct, (bookedProduct) => bookedProduct.book, {
    cascade: true,
  })
  booked_product: BookedProduct[];

  @Column({ nullable: true })
  customer_id: string;
  @ManyToOne(() => User, (user) => user.bookings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer: User;

  @Column({ type: 'timestamp' })
  booking_date: Date;

  @Column({ nullable: true })
  booking_address: string;

  @Column({ type: 'varchar', length: 6, select: false })
  book_otp: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  grand_total: number;

  @Column({ nullable: true })
  payment_id: string;
}