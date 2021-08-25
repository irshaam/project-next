/* eslint-disable @typescript-eslint/no-unused-vars */
import { ForbiddenError } from '@casl/ability';
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
  Scope,
  MethodNotAllowedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Tag } from '@prisma/client';
import { Request } from 'express';

import { PrismaService } from '../prisma/prisma.service';

import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable({ scope: Scope.REQUEST })
export class TagsService {
  constructor(@Inject(REQUEST) private request: Request, private readonly prisma: PrismaService) {}
  async create(data: any): Promise<Tag> {
    ForbiddenError.from(this.request.user.ability).throwUnlessCan('create', 'Tag');
    const {
      typeId,
      name,
      nameEn,
      slug,
      description,
      parentId,
      descriptionEn,
      image,
      icon,
      primaryColor,
      secondryColor,
      layout,
      createdBy,
    } = data;

    const uniqueName = await this.prisma.tag.findFirst({
      where: { name: name },
    });

    if (uniqueName) {
      throw new BadRequestException('Tag name already exist!');
    }

    const formData = {
      name,
      nameEn,
      slug,
      description,
      descriptionEn,
      image,
      icon,
      primaryColor,
      secondryColor,
      layout,
      createdBy,
    };

    if (parentId) {
      formData['parent'] = {
        connect: { id: Number(parentId) },
      };
    }

    if (typeId) {
      formData['tagType'] = {
        connect: { id: Number(typeId) },
      };
    }

    return await this.prisma.tag.create({ data });
  }

  findAll({ type }) {
    ForbiddenError.from(this.request.user.ability).throwUnlessCan('read', 'Tag');
    const or =
      type != 'all'
        ? {
            tagType: {
              slug: type,
            },
          }
        : {};

    return this.prisma.tag.findMany({
      include: {
        child: {
          select: {
            id: true,
            name: true,
            nameEn: true,
          },
        },
        tagType: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      where: {
        ...or,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: number) {
    ForbiddenError.from(this.request.user.ability).throwUnlessCan('read', 'Tag');
    const tag = await this.prisma.tag.findFirst({
      where: { id: Number(id) },
    });

    if (!tag) {
      throw new NotFoundException(`Post #${id} not found!`);
    }

    return tag;
  }

  async search(query: string) {
    return await this.prisma.tag.findMany({
      where: {
        nameEn: { contains: query },
      },
    });
  }

  async update(id: string, data: any) {
    ForbiddenError.from(this.request.user.ability).throwUnlessCan('update', 'Tag');
    // if (id != updateTagDto.id) {
    //   throw new BadRequestException();
    // }

    // const { name } = updateTagDto;

    // const uniqueName = await this.prisma.tag.findFirst({
    //   where: { name: name },
    // });

    // if (uniqueName) {
    //   throw new BadRequestException('Tag name already exist!');
    // }

    const {
      typeId,
      name,
      nameEn,
      slug,
      description,
      parentId,
      descriptionEn,
      image,
      icon,
      primaryColor,
      secondryColor,
      layout,
      createdBy,
    } = data;

    const formData = {
      name,
      nameEn,
      slug,
      description,
      descriptionEn,
      image,
      icon,
      primaryColor,
      secondryColor,
      layout,
      createdBy,
    };

    if (parentId) {
      formData['parent'] = {
        connect: { id: Number(parentId) },
      };
    }

    if (typeId) {
      formData['tagType'] = {
        connect: { id: Number(typeId) },
      };
    }

    const tag = await this.prisma.tag.update({
      where: {
        id: Number(id),
      },
      data: {
        ...formData,
      },
    });

    return tag;

    // const uniqueName = await this.prisma.tag.findOne({
    //   where: { id: Not(id), name: name },
    // });

    // if (uniqueName) {
    //   throw new BadRequestException('Tag already exist!');
    // }

    // const tagType = await this.prisma.tag.preload({
    //   id: id as number,
    //   ...updateTagDto,
    // });

    // if (!tagType) {
    //   throw new NotFoundException(`Tag #${id} not found!`);
    // }

    // return this.prisma.tag.save(tagType);
  }

  async remove(id: string) {
    ForbiddenError.from(this.request.user.ability).throwUnlessCan('delete', 'Tag');

    const tagExist = await this.prisma.tag.findFirst({
      where: { id: Number(id) },
    });

    if (!tagExist) {
      throw new NotFoundException();
    }

    const { _count } = await this.prisma.tag.findFirst({
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
      throw new MethodNotAllowedException('One or more posts connected to the tag!!');
    }

    // Delete
    return await this.prisma.tag.delete({ where: { id: Number(id) } });
  }
}
