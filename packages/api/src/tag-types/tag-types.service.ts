import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTagTypeDto } from './dto/create-tag-type.dto';
import { UpdateTagTypeDto } from './dto/update-tag-type.dto';
import { TagType } from './entities/tag-type.entity';

@Injectable()
export class TagTypesService {
  constructor(
    @InjectRepository(TagType)
    private readonly tagTypesRepository: Repository<TagType>,
  ) {}

  async create(createTagTypeDto: CreateTagTypeDto) {
    const { name, slug } = createTagTypeDto;

    const uniqueName = await this.tagTypesRepository.findOne({
      where: { name: name },
    });

    if (uniqueName) {
      throw new BadRequestException('Tag type already exist!');
    }

    const uniqueSlug = await this.tagTypesRepository.findOne({
      where: { slug: slug },
    });

    if (uniqueSlug) {
      throw new BadRequestException('Tag slug already exist!');
    }

    const tagType = this.tagTypesRepository.create(createTagTypeDto);
    await this.tagTypesRepository.save(tagType);
    // catch((error) => {
    //   console.log(error);
    //   throw new HttpException(
    //     {
    //       message: error.message,
    //       detail: error,
    //     },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // });

    return tagType;
  }

  findAll() {
    return this.tagTypesRepository.find();
  }

  findOne(id: number) {
    return this.tagTypesRepository.findOne(id);
  }

  async update(id: number, updateTagTypeDto: UpdateTagTypeDto) {
    if (id != updateTagTypeDto.id) {
      throw new BadRequestException();
    }

    const tagType = await this.tagTypesRepository.preload({
      id: id as number,
      ...updateTagTypeDto,
    });

    if (!tagType) {
      throw new NotFoundException(`Tag type #${id} not found!`);
    }

    return this.tagTypesRepository.save(tagType);
  }

  async remove(id: number) {
    const tagType = await this.tagTypesRepository.findOne(id);
    if (!tagType) {
      throw new NotFoundException();
    }
    return await this.tagTypesRepository.remove(tagType);
  }
}
