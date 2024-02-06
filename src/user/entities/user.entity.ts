import { OTP } from 'src/otp/entities/otp.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum UserType {
  CUSTOMER = 'CUSTOMER',
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

  @Column({ select: false })
  password: string;

  @Column({ default: false, nullable: true })
  isVerified: boolean;

  @Column({ type: 'enum', enum: UserType, default: UserType.CUSTOMER })
  user_type: UserType;

  @Column({ type: 'enum', enum: AuthType, default: AuthType.EMAIL })
  auth_type: AuthType;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => OTP, (otp) => otp.user, { cascade: true })
  otps: OTP[];
}
