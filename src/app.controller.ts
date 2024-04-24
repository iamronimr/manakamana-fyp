import { Controller, Get, Render, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './@guards/jwt.guard';
import { Response } from 'express';

@Controller()
export class AppController 
{
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Res() res: Response) {
    return res.render('index')
  }

  @Get('/verify')
  @Render('verify')
  getVerificationPage() {
    const data = {
      pageTitle: 'Verify your Account'
    };

    return data;
  }

  @Get('/product')
  @Render('product')
  getProductPage() {
    const data = {
      pageTitle: 'Available Products'
    };
    return data;
  }
  @Get('/contact')
  @Render('contact')
  getContactPage() {
    const data = {
      pageTitle: 'Available Products'
    };
    return data;
  }

  
  @Get('/worker')
  getWorkerPage(@Res() res: Response) {
    return res.render('worker')
  }
  
  @Get('/cart')
  getCartPage(@Res() res: Response) {
    return res.render('cart')
  }

  @Get('/admin')
  @Render('admin')
  getAdminPage() {
    const data = {
      pageTitle: 'Admin Dashboard'
    };

    return data;
  }

  @Get('/manage_product')
  @Render('manage_product')
  getAdminProduct() {
    const data = {
      pageTitle: 'Manage Products'
    };

    return data;
  }

  @Get('/manage_worker')
  @Render('manage_worker')
  getAdminWorker() {
    const data = {
      pageTitle: 'Manage Workers'
    };

    return data;
  }
}
