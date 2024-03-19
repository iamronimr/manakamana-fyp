import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({name: 'workers'})
export class Worker{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    fullname: string;
    
    @Column()
    address: string;

    @Column()
    description: string;

    @Column()
    contact: string;

    @Column()
    photo: string;

    @Column()
    servicetype: string;
}