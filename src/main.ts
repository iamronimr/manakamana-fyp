import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import {resolve } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(resolve('./public'));
  app.useStaticAssets(resolve('./static'));
  app.setBaseViewsDir(resolve('./views'));
  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();
