import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from './@config/typeorm.config';
import { OtpModule } from './otp/otp.module';
import { ProductsModule } from './products/products.module';
import { ServiceprovidersModule } from './serviceproviders/serviceproviders.module';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useFactory: () => TypeOrmConfig }),
    AuthModule,
    UserModule,
    OtpModule,
    ProductsModule,
    ServiceprovidersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
