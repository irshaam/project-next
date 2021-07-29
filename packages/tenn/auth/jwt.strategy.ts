import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/users/entities/user.entity';
import { UserService } from 'src/users/user.service';

import { AuthService } from './auth.service';
import { jwtConstants } from './constants';

export interface JwtPaylod {
  email: string;
  password: string;
}

export interface AccessTokenPayload {
  sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      signOptions: {
        expiresIn: '5m',
      },
    });
  }

  async validate(payload: AccessTokenPayload): Promise<User> {
    const { sub: id } = payload;

    const user = await this.userService.findById(id);

    if (!user) {
      return null;
    }

    return user;
  }

  // async validate(payload: JwtPaylod) {
  //   // const user = await this.authService.validateUser(payload);
  //   // if (!user) {
  //   //   throw new UnauthorizedException();
  //   // }
  //   // return user;
  //   return { userId: payload.sub, username: payload.username };
  // }

  // async validate(payload: any) {
  //   return { ...payload };
  // }
}
