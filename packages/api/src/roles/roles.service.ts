/* eslint-disable @typescript-eslint/no-unused-vars */
import { ForbiddenError } from '@casl/ability';
import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Role } from '@prisma/client';
import { Request } from 'express';

import { PrismaService } from '../prisma/prisma.service';

// import { CreateTagDto } from './dto/create-tag.dto';
// import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable({ scope: Scope.REQUEST })
export class RolesService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Get one role by id
   * @param id
   * @returns
   */
  findOne = async (id: number): Promise<Role> => {
    ForbiddenError.from(this.request.user.ability).throwUnlessCan(
      'create',
      'User',
    );
    return await this.prisma.role.findFirst({
      where: {
        id: id,
      },
      include: {
        permissions: {
          select: {
            ability: true,
          },
        },
      },
    });
  };

  /**
   * Get list of roles
   * @returns Role[]
   */
  findAll = async (): Promise<Role[]> => {
    ForbiddenError.from(this.request.user.ability).throwUnlessCan(
      'create',
      'User',
    );
    return await this.prisma.role.findMany({
      include: {
        permissions: {
          select: {
            ability: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });
  };
}
