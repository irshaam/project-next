import { packRules } from '@casl/ability/extra';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { RefreshToken, User } from '@prisma/client';
import { TokenExpiredError } from 'jsonwebtoken';

import { PrismaService } from '../prisma/prisma.service';

// import { UserService } from '../users/user.service';

// import { CreateRefreshTokenDto } from './dto/create-refresh-token-dto';

const BASE_OPTIONS: JwtSignOptions = {
  issuer: 'https://badha.io',
  audience: 'https://badha.io',
};

export interface RefreshTokenPayload {
  jti: number;
  sub: number | string;
}

@Injectable()
export class TokenService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

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
    const expiration = new Date();
    expiration.setTime(expiration.getTime() + ttl);

    return await this.prisma.refreshToken.create({
      data: {
        userId: user.id,
        isRevoked: false,
        expires: expiration,
      },
    });
  }

  public async findTokenById(id: number): Promise<RefreshToken | null> {
    return this.prisma.refreshToken.findFirst({
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
  async generateAccessToken(user: any): Promise<any> {
    const opts: JwtSignOptions = {
      ...BASE_OPTIONS,
      subject: String(user.id),

      // subject: String(user.id),
    };

    return this.jwtService.signAsync(
      { rules: packRules(user.permissions) },
      opts,
    );
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

    return this.prisma.user.findFirst({
      where: {
        id: Number(subId),
      },
    });
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

    return this.prisma.refreshToken.findFirst({
      where: {
        id: tokenId,
      },
    });
  }
}
