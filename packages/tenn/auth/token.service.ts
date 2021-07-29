import { SigningOptions } from 'crypto';
import { stringify } from 'querystring';

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenExpiredError } from 'jsonwebtoken';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { UserService } from '../users/user.service';

// import { CreateRefreshTokenDto } from './dto/create-refresh-token-dto';
import { RefreshToken } from './entities/refresh-token.entity';

const BASE_OPTIONS: JwtSignOptions = {
  issuer: 'https://my-app.com',
  audience: 'https://my-app.com',
};

export interface RefreshTokenPayload {
  jti: number;
  sub: number | string;
}

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  /**
   * Create Refresh Token
   * @param user
   * @param ttl
   * @returns
   */
  public async createRefreshToken(
    user: User,
    ttl: number,
  ): Promise<RefreshToken> {
    const token = new RefreshToken();
    const expiration = new Date();
    expiration.setTime(expiration.getTime() + ttl);

    token.userId = user.id;
    // token.userId = user.id;
    token.isRevoked = false;
    token.expires = expiration;

    return await this.refreshTokenRepository.save(token);
  }

  public async findTokenById(id: number): Promise<RefreshToken | null> {
    return this.refreshTokenRepository.findOne({
      where: {
        id,
      },
    });
  }

  /**
   * Generate Access Token
   * @param user User
   * @returns
   */
  async generateAccessToken(user: User): Promise<any> {
    const opts: JwtSignOptions = {
      ...BASE_OPTIONS,
      subject: String(user.uuid),
      // subject: String(user.id),
    };

    return this.jwtService.signAsync({}, opts);
  }

  /**
   * Generate Refresh Token
   * @param user
   * @param expiresIn
   * @returns
   */
  async generateRefreshToken(user: User, expiresIn: number): Promise<string> {
    const token = await this.createRefreshToken(user, expiresIn);

    const opts: JwtSignOptions = {
      ...BASE_OPTIONS,
      expiresIn,
      subject: String(user.uuid),
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

    return this.userService.findByUuid(subId as string);
  }

  /**
   * Get Stored Token from Refresh Token Payload
   * @param payload
   * @returns
   */
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
