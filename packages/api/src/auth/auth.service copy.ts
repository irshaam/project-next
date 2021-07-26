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
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

import { UserService } from '../users/user.service';

// import { CreateRefreshTokenDto } from './dto/create-refresh-token-dto';
import { RefreshToken } from './entities/refresh-token.entity';

const BASE_OPTIONS: JwtSignOptions = {
  issuer: 'https://my-app.com',
  audience: 'https://my-app.com',
};

export interface RefreshTokenPayload {
  jti: number;
  sub: number;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private userService: UserService,
    private jwtService: JwtService,
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

    const payload = { name: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      expiresIn,
    };
    // console.log(payload);
    // const user = await this.validateUser(payload);
    // // Create Signed Token
    // const token = this._createToken(user);
    // return {
    //   email: user.email,
    //   ...token,
    // };
  }

  private _createToken({ email }: { email: string }): any {
    const expiresIn = '60s';
    // const expiresIn = process.env.EXPIRESIN;

    const user: { email: string } = { email };
    const accessToken = this.jwtService.sign(user);
    return {
      expiresIn,
      accessToken,
    };
  }

  async createRefreshToken(user: User, ttl: number): Promise<RefreshToken> {
    const createRefreshToken = {};
    const expiration = new Date();
    expiration.setTime(expiration.getTime() + ttl);

    const token = this.refreshTokenRepository.create(createRefreshToken);
    token.userId = user.id;
    token.isRevoked = false;

    token.expires = expiration;
    return await this.refreshTokenRepository.save(token);
  }

  async findTokenById(id: number): Promise<RefreshToken | null> {
    return this.refreshTokenRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Generate Access Token
   */
  async generateAccessToken(user: User): Promise<string> {
    const opts: JwtSignOptions = {
      ...BASE_OPTIONS,
      subject: String(user.id),
    };

    return this.jwtService.signAsync({}, opts);
  }

  public async generateRefreshToken(
    user: User,
    expiresIn: number,
  ): Promise<string> {
    const token = await this.createRefreshToken(user, expiresIn);

    const opts: JwtSignOptions = {
      ...BASE_OPTIONS,
      expiresIn,
      subject: String(user.id),
      jwtid: String(token.id),
    };

    return this.jwtService.signAsync({}, opts);
  }

  public async resolveRefreshToken(
    encoded: string,
  ): Promise<{ user: User; token: RefreshToken }> {
    const payload = await this.decodeRefreshToken(encoded);
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload);

    if (!token) {
      throw new UnprocessableEntityException('Refresh token not found');
    }

    if (token.isRevoked) {
      throw new UnprocessableEntityException('Refresh token revoked');
    }

    const user = await this.getUserFromRefreshTokenPayload(payload);

    if (!user) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return { user, token };
  }

  public async createAccessTokenFromRefreshToken(
    refresh: string,
  ): Promise<{ token: string; user: User }> {
    const { user } = await this.resolveRefreshToken(refresh);

    const token = await this.generateAccessToken(user);

    return { user, token };
  }

  private async decodeRefreshToken(
    token: string,
  ): Promise<RefreshTokenPayload> {
    try {
      return this.jwtService.verifyAsync(token);
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Refresh token expired');
      } else {
        throw new UnprocessableEntityException('Refresh token malformed');
      }
    }
  }

  private async getUserFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<User> {
    const subId = payload.sub;

    if (!subId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return this.userService.findById(subId);
  }

  private async getStoredTokenFromRefreshTokenPayload(
    payload: RefreshTokenPayload,
  ): Promise<RefreshToken | null> {
    const tokenId = payload.jti;

    if (!tokenId) {
      throw new UnprocessableEntityException('Refresh token malformed');
    }

    return this.findTokenById(tokenId);
  }
}
