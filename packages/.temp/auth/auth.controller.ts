import { Controller, Request, Post, Get, Req, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('whoami')
  @UseGuards(JwtAuthGuard)
  public async testAuth(@Request() req: any): Promise<any> {
    return req.user;
  }
  //   // @UseGuards(AuthGuard('local'))
  //   @Post('auth/login')
  //   async login(@Request() req) {
  //     // return req;
  //     return this.authService.login(req.user);
  //   }
  //   @UseGuards(JwtAuthGuard)
  //   @Get('profile')
  //   getProfile(@Request() req) {
  //     return req.user;
  //   }
}

//   constructor(private authService: AuthService) {}
