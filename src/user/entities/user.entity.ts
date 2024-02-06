import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserType {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
export enum AuthType {
  EMAIL = 'EMAIL',
  GOOGLE = 'GOOGLE',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false, nullable: true })
  isVerified: boolean;

  @Column({ type: 'enum', enum: UserType, default: UserType.USER })
  user_type: UserType;

  @Column({ type: 'enum', enum: AuthType, default: AuthType.EMAIL })
  auth_type: AuthType;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
