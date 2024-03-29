import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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

    @Column()
    photo: string;
}