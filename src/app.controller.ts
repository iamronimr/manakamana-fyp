import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return { message: 'Hello from nest js' };
  }

  @Get('/login')
  @Render('login')
  getLoginPage() {
    const data = {
      pageTitle: 'Login Page',
      welcomeMessage: 'Welcome to the login page!',
    };

    return data;
  }

  @Get('/register')
  @Render('register')
  getRegisterPage() {
    const data = {
      pageTitle: 'Register Page',
      welcomeMessage: 'Welcome to the register page!',
    };

    return data;
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

  // product_table
}
