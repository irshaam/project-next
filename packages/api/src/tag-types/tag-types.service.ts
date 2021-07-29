import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { CreateTagTypeDto } from './dto/create-tag-type.dto';
import { UpdateTagTypeDto } from './dto/update-tag-type.dto';

@Injectable()
export class TagTypesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateTagTypeDto) {
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

  async findAll() {
    return await this.prisma.tagType.findMany();
  }

  async findOne(id: number) {
    return this.prisma.tagType.findFirst({
      where: {
        id: Number(id),
      },
    });
  }

  async update(id: number, data: UpdateTagTypeDto) {
    // if (id != updateTagTypeDto.id) {
    //   throw new BadRequestException();
    // }

    // const tagType = await this.tagTypesRepository.preload({
    //   id: id as number,
    //   ...updateTagTypeDto,
    // });

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
    return await this.prisma.tagType.delete({
      where: {
        id: Number(id),
      },
    });
    // const tagType = await this.tagTypesRepository.findOne(id);
    // if (!tagType) {
    //   throw new NotFoundException();
    // }
    // return await this.tagTypesRepository.remove(tagType);
  }
}
