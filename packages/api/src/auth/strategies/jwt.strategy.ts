import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PrismaService } from '../../prisma/prisma.service';
import { createAbility } from '../../utils/app-ability';
import { jwtConstants } from '../constants';

export interface JwtPaylod {
  email: string;
  password: string;
}

export interface AccessTokenPayload {
  sub: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
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

    const user = await this.prisma.user.findFirst({
      where: {
        id: Number(id),
      },
      include: {
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
      return null;
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
    user['ability'] = createAbility(permissions);

    return user;
  }
}
