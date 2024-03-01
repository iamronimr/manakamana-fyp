import { Module } from '@nestjs/common';
import { ServiceprovidersController } from './serviceproviders.controller';
import { ServiceprovidersService } from './serviceproviders.service';

@Module({
  controllers: [ServiceprovidersController],
  providers: [ServiceprovidersService]
})
export class ServiceprovidersModule {}
