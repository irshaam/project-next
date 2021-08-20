import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { cdn_url } from '../config';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../users/user.service';

// import { CreateRefreshTokenDto } from './dto/create-refresh-token-dto';
import { RefreshTokenDto } from './dto/refresh-token-dto';
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
    private prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email: username },
      include: {
        picture: {
          select: {
            path: true,
          },
        },
        roles: {
          select: {
            name: true,
            permissions: {
              select: {
                ability: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found!');
    }

    const areEqual = await bcrypt.compare(password, user.password);

    if (!areEqual) {
      throw new UnauthorizedException('Invalid credentials !');
    }

    // Get User Permissions
    const permissions = Array.isArray(user.roles)
      ? [].concat(
          ...user.roles.map((role) =>
            role.permissions.map((permission: any) => {
              return permission.ability;
            }),
          ),
        )
      : user.roles;

    // Create Abilities
    user['permissions'] = permissions;

    return user;
  }

  async login(user: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const expiresIn = '60s';

    const token = await this.tokenService.generateAccessToken(user);
    const refresh = await this.tokenService.generateRefreshToken(user, 60 * 60 * 24 * 30);

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

    const { user, token } = await this.tokenService.createAccessTokenFromRefreshToken(refresh_token);

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
  private buildResponsePayload(user: any, accessToken: string, refreshToken?: string): AuthenticationPayload {
    console.log(user);
    return {
      id: String(user.id),
      name: user.nameEn,
      email: user.email,
      image: user.picture?.path ? `${cdn_url}/${user.picture?.path}` : `${cdn_url}/default.png`,
      // type: 'bearer',
      token: accessToken,
      ...(refreshToken ? { refresh_token: refreshToken } : {}),
    };
  }
}
