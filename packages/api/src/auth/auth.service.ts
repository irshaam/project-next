import { stringify } from 'querystring';

import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { TokenExpiredError } from 'jsonwebtoken';
import { cdn_url } from 'src/config';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import { UserService } from '../users/user.service';

// import { CreateRefreshTokenDto } from './dto/create-refresh-token-dto';
import { RefreshTokenDto } from './dto/refresh-token-dto';
import { RefreshToken } from './entities/refresh-token.entity';
import { TokenService } from './token.service';

export interface AuthenticationPayload {
  // type: string;
  token: string;
  refresh_token?: string;
  name: string;
  id: string;
  email: string;
  image: string | null;
  // user: User;
}

// export interface AuthenticationPayload {
//   user: User;
//   payload: {
//     type: string;
//     token: string;
//     refresh_token?: string;
//   };
// }

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(username);

    if (!user) {
      throw new UnauthorizedException('User not found!');
    }

    const areEqual = await bcrypt.compare(password, user.password);

    if (!areEqual) {
      throw new UnauthorizedException('Invalid credentials !');
    }

    return user;
  }

  async login(user: any) {
    const expiresIn = '60s';

    const token = await this.tokenService.generateAccessToken(user);
    const refresh = await this.tokenService.generateRefreshToken(
      user,
      60 * 60 * 24 * 30,
    );

    const payload = this.buildResponsePayload(user, token, refresh);

    // const payload = { name: user.name, sub: user.id };
    return payload;
    // console.log(payload);
    // const user = await this.validateUser(payload);
    // // Create Signed Token
    // const token = this._createToken(user);
    // return {
    //   email: user.email,
    //   ...token,
    // };
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const { refresh_token } = refreshTokenDto;

    const { user, token } =
      await this.tokenService.createAccessTokenFromRefreshToken(refresh_token);

    const payload = this.buildResponsePayload(user, token);

    return payload;
  }
  // private _createToken({ email }: { email: string }): any {
  //   const expiresIn = '60s';
  //   // const expiresIn = process.env.EXPIRESIN;

  //   const user: { email: string } = { email };
  //   const accessToken = this.jwtService.sign(user);
  //   return {
  //     expiresIn,
  //     accessToken,
  //   };
  // }

  // private buildResponsePayload(
  //   user: User,
  //   accessToken: string,
  //   refreshToken?: string,
  // ): AuthenticationPayload {
  //   return {
  //     user: user,
  //     payload: {
  //       type: 'bearer',
  //       token: accessToken,
  //       ...(refreshToken ? { refresh_token: refreshToken } : {}),
  //     },
  //   };
  // }
  private buildResponsePayload(
    user: User,
    accessToken: string,
    refreshToken?: string,
  ): AuthenticationPayload {
    return {
      id: user.uuid,
      name: user.name_en,
      email: user.email,
      image: user.picture
        ? `${cdn_url}/${user.picture}`
        : `${cdn_url}/default.png`,
      // type: 'bearer',
      token: accessToken,
      ...(refreshToken ? { refresh_token: refreshToken } : {}),
    };
  }
}
