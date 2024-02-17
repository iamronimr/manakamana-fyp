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
      // Other data you want to pass
    };

    return data;
  }
}
