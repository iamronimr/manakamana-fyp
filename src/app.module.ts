import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './@config/typeorm.config';
import { OtpModule } from './otp/otp.module';
import { ProductsModule } from './products/products.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { WorkersModule } from './workers/workers.module';
import { CartsModule } from './carts/carts.module';
import { ContactsModule } from './contacts/contacts.module';
import { BookModule } from './book/book.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: () => TypeOrmConfig }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..','static'),
      serveRoot: '/static',
    }),
    AuthModule,
    UserModule,
    OtpModule,
    ProductsModule,
    WorkersModule,
    CartsModule,    
    ContactsModule, BookModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
