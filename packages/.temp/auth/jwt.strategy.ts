import { ExtractJwt, Strategy, UnauthorizedException } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { AuthService } from './auth.service';

export interface JwtPaylod {
  email: string;
  password: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // async validate(payload: JwtPaylod) {
  //   // const user = await this.authService.validateUser(payload);
  //   // if (!user) {
  //   //   throw new UnauthorizedException();
  //   // }
  //   // return user;
  //   return { userId: payload.sub, username: payload.username };
  // }

  async validate(payload: any) {
    return { ...payload };
  }
}
