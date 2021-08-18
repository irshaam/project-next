import { ForbiddenError } from '@casl/ability';
import {
  Injectable,
  Inject,
  Scope,
  BadRequestException,
  NotFoundException,
  MethodNotAllowedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { User as UserModel } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

import { PrismaService } from '../prisma/prisma.service';

// @Injectable()
@Injectable({ scope: Scope.REQUEST })
export class UserService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private prisma: PrismaService,
  ) {}

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        roles: {
          select: {
            id: true,
          },
        },
      },
    });

    return user;
  }

  async findAll({ page = 1, take = 15 }) {
    ForbiddenError.from(this.request.user.ability).throwUnlessCan(
      'read',
      'User',
    );

    const or: any = '';
    // Invalid Page
    if (page < 0) {
      throw new BadRequestException('Page value should not be negative!!');
    }

    if (!page) {
      page = 1;
    }
    if (!take) {
      take = 10;
    }

    let data = [];
    let totalCount = 0;
    let totalPages = 0;
    const skip = (page - 1) * take;

    totalCount = await this.prisma.user.count();
    totalPages = Math.ceil(totalCount / take);

    data = await this.prisma.user.findMany({
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,
      include: {
        roles: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        id: 'desc',
      },
    });

    return {
      data,
      totalCount,
      currentPage: page || 0,
      totalPages,
    };
  }

  async create(data: any) {
    const passwordHash = await bcrypt.hash(data.password, 10);

    const formData = {
      name: data.name,
      nameEn: data.nameEn,
      slug: data.slug,
      email: data.email,
      picture: data.picture,
      coverPicture: data.coverPicture,
      bio: data.bio,
      bioEn: data.bioEn,
      twitter: data.twitter,
      facebook: data.facebook,
      isActive: data.isActive,
      password: passwordHash,
    };

    if (data.roles && data.roles.length > 0) {
      formData['roles'] = {
        connect: data.roles,
      };
    }

    const user = await this.prisma.user.create({
      data: {
        ...formData,
      },
    });

    return user;
  }

  async update(id: number, data: any) {
    ForbiddenError.from(this.request.user.ability).throwUnlessCan(
      'update',
      'User',
    );

    const formData = {
      name: data.name,
      nameEn: data.nameEn,
      slug: data.slug,
      email: data.email,
      picture: data.picture,
      coverPicture: data.coverPicture,
      bio: data.bio,
      bioEn: data.bioEn,
      twitter: data.twitter,
      facebook: data.facebook,
      isActive: data.isActive,
    };

    console.log(data.password);

    if (data.password) {
      formData['password'] = await bcrypt.hash(data.password, 10);
    }

    if (data.roles && data.roles.length > 0) {
      formData['roles'] = {
        set: data.roles,
      };
    }

    const user = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...formData,
      },
    });

    return user;
  }

  async remove(id: string) {
    ForbiddenError.from(this.request.user.ability).throwUnlessCan(
      'delete',
      'User',
    );

    const userExist = await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });

    if (!userExist) {
      throw new NotFoundException();
    }

    const { _count } = await this.prisma.user.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        _count: {
          select: { posts: true },
        },
      },
    });

    if (_count.posts > 0) {
      throw new MethodNotAllowedException(
        'One or more posts connected to the user!!',
      );
    }

    // Delete
    return await this.prisma.user.delete({ where: { id: Number(id) } });
  }

  findAllAuthors() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        nameEn: true,
        picture: true,
      },
    });
  }

  async findByEmail(email: string): Promise<UserModel | undefined> {
    return await this.prisma.user.findFirst({ where: { email: email } });
  }
}
