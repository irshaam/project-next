/* eslint-disable @typescript-eslint/no-unused-vars */
import { ForbiddenError } from '@casl/ability';
import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Permission } from '@prisma/client';
import { Request } from 'express';

import { PrismaService } from '../prisma/prisma.service';

// import { CreatePermissionDto } from './dto/create-permission.dto';
// import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable({ scope: Scope.REQUEST })
export class PermissionsService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Get one permission by id
   * @param id
   * @returns
   */
  findOne = async (id: number): Promise<Permission> => {
    ForbiddenError.from(this.request.user.ability).throwUnlessCan(
      'read',
      'Permission',
    );
    return await this.prisma.permission.findFirst({
      where: {
        id: id,
      },
      include: {
        roles: {
          select: {
            name: true,
          },
        },
      },
    });
  };

  /**
   * Get list of permissions
   * @returns Permission[]
   */
  findAll = async (): Promise<Permission[]> => {
    ForbiddenError.from(this.request.user.ability).throwUnlessCan(
      'read',
      'Permission',
    );
    return await this.prisma.permission.findMany({
      include: {
        roles: {
          select: {
            name: true,
          },
        },
      },
    });
  };
}
