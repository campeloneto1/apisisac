import { Body, Controller, Post, HttpCode, HttpStatus, Get, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './auth.interface';
import { Public } from './public';
import { Throttle } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

  @Public()
  @Throttle({ default: { limit: 3, ttl: 60000 } })  
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signIn: Auth) {
    return this.authService.signIn(signIn.cpf, signIn.password);
  }

  
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
