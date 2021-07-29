/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { categoryId } from 'src/config';
import { PrismaService } from 'src/prisma.service';

import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: any) {
    // const uniqueName = await this.prisma.tag.find({
    //   where: { name: name },
    // });

    // if (uniqueName) {
    //   throw new BadRequestException('Tag type already exist!');
    // }

    return await this.prisma.tag.create({ data });
  }

  findAll() {
    return this.prisma.tag.findMany({
      include: {
        child: {
          select: {
            id: true,
            name: true,
          },
        },
        tagType: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  // getCategories() {
  //   return this.prisma.tag.find({ where: { typeId: categoryId } });
  // }

  // findOne(id: number) {
  //   return this.prisma.tag.findOne(id);
  // }

  // async search(query: string) {
  //   return await this.prisma.tag.find({
  //     where: [{ name: ILike(`%${query}%`) }, { name_en: ILike(`%${query}%`) }],
  //   });
  // }

  // async update(id: number, updateTagDto: UpdateTagDto) {
  //   if (id != updateTagDto.id) {
  //     throw new BadRequestException();
  //   }

  //   const { name } = updateTagDto;

  //   const uniqueName = await this.prisma.tag.findOne({
  //     where: { id: Not(id), name: name },
  //   });

  //   if (uniqueName) {
  //     throw new BadRequestException('Tag already exist!');
  //   }

  //   const tagType = await this.prisma.tag.preload({
  //     id: id as number,
  //     ...updateTagDto,
  //   });

  //   if (!tagType) {
  //     throw new NotFoundException(`Tag #${id} not found!`);
  //   }

  //   return this.prisma.tag.save(tagType);
  // }

  // async remove(id: number) {
  //   const tag = await this.prisma.tag.findOne(id);
  //   if (!tag) {
  //     throw new NotFoundException();
  //   }
  //   return await this.prisma.tag.remove(tag);
  // }

  // async findByIds(tags: number[]) {
  //   return await this.prisma.tag.findByIds(tags);
  // }
}
