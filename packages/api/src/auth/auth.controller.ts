import {
  Controller,
  Request,
  Post,
  Get,
  UseGuards,
  Body,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { RefreshTokenDto } from './dto/refresh-token-dto';
import { JwtAuthGuard, LocalAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * Login
   * @param req {email, password}
   * @returns
   */
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() request) {
    return this.authService.login(request.user);
  }

  /**
   * Test Logged in User
   * @param req
   * @returns
   */
  @Get('whoami')
  public async testAuth(@Request() request: any): Promise<any> {
    const {
      id,
      uuid,
      name,
      nameEn,
      slug,
      email,
      password,
      picture,
      coverPicture,
      roles,
      permissions,
    } = request.user;
    return {
      id,
      uuid,
      name,
      nameEn,
      slug,
      email,
      password,
      picture,
      coverPicture,
      roles,
      permissions,
    };
  }

  /**
   * Generates a Refresh Token
   * @param refreshTokenDto
   * @returns
   */
  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  /**
   * Test Logged in User
   * @param req
   * @returns
   */
  @Get('permissions')
  async getPermissions(@Request() request: any) {
    return request.user.permissions;
  }
}
