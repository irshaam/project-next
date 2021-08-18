import { ForbiddenError } from '@casl/ability';
import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { PrismaService } from '../prisma/prisma.service';

import { CreateTagTypeDto } from './dto/create-tag-type.dto';
import { UpdateTagTypeDto } from './dto/update-tag-type.dto';

@Injectable({ scope: Scope.REQUEST })
export class TagTypesService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private prisma: PrismaService,
  ) {}

  async create(data: CreateTagTypeDto) {
    ForbiddenError.from(this.request.user.ability).throwUnlessCan(
      'create',
      'all',
    );
    return await this.prisma.tagType.create({ data });

    // const { name, slug } = createTagTypeDto;
    // const uniqueName = await this.tagTypesRepository.findOne({
    //   where: { name: name },
    // });
    // if (uniqueName) {
    //   throw new BadRequestException('Tag type already exist!');
    // }
    // const uniqueSlug = await this.tagTypesRepository.findOne({
    //   where: { slug: slug },
    // });
    // if (uniqueSlug) {
    //   throw new BadRequestException('Tag slug already exist!');
    // }
    // const tagType = this.tagTypesRepository.create(createTagTypeDto);
    // await this.tagTypesRepository.save(tagType);
    // // catch((error) => {
    // //   console.log(error);
    // //   throw new HttpException(
    // //     {
    // //       message: error.message,
    // //       detail: error,
    // //     },
    // //     HttpStatus.BAD_REQUEST,
    // //   );
    // // });
    // return tagType;
  }

  /**
   * Find All Tag Types
   */
  async findAll() {
    ForbiddenError.from(this.request.user.ability).throwUnlessCan(
      'read',
      'Tag',
    );
    return await this.prisma.tagType.findMany();
  }

  /**
   * Find All Tag Types
   */
  async findOne(id: number) {
    ForbiddenError.from(this.request.user.ability).throwUnlessCan(
      'read',
      'Tag',
    );
    return this.prisma.tagType.findFirst({
      where: {
        id: Number(id),
      },
    });
  }

  async update(id: number, data: UpdateTagTypeDto) {
    ForbiddenError.from(this.request.user.ability).throwUnlessCan(
      'update',
      'Tag',
    );

    // if (id != updateTagTypeDto.id) {
    //   throw new BadRequestException();
    // }

    // if (!tagType) {
    //   throw new NotFoundException(`Tag type #${id} not found!`);
    // }

    return await this.prisma.tagType.update({
      where: {
        id: Number(id),
      },
      data,
    });
  }

  async remove(id: number) {
    ForbiddenError.from(this.request.user.ability).throwUnlessCan(
      'delete',
      'Tag',
    );
    return await this.prisma.tagType.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
