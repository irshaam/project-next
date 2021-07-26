/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { categoryId } from 'src/config';
import { TreeRepository, Not, Like, ILike } from 'typeorm';

import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagsRepository: TreeRepository<Tag>,
  ) {}
  async create(createTagDto: CreateTagDto) {
    const { name } = createTagDto;

    const uniqueName = await this.tagsRepository.findOne({
      where: { name: name },
    });

    if (uniqueName) {
      throw new BadRequestException('Tag type already exist!');
    }

    const tag = this.tagsRepository.create(createTagDto);
    return await this.tagsRepository.save(tag).catch((error) => {
      return error;
    });
  }

  findAll() {
    return this.tagsRepository.find({ relations: ['children', 'type'] });
  }

  getCategories() {
    return this.tagsRepository.find({ where: { typeId: categoryId } });
  }

  findOne(id: number) {
    return this.tagsRepository.findOne(id);
  }

  async search(query: string) {
    return await this.tagsRepository.find({
      where: [{ name: ILike(`%${query}%`) }, { name_en: ILike(`%${query}%`) }],
    });
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    if (id != updateTagDto.id) {
      throw new BadRequestException();
    }

    const { name } = updateTagDto;

    const uniqueName = await this.tagsRepository.findOne({
      where: { id: Not(id), name: name },
    });

    if (uniqueName) {
      throw new BadRequestException('Tag already exist!');
    }

    const tagType = await this.tagsRepository.preload({
      id: id as number,
      ...updateTagDto,
    });

    if (!tagType) {
      throw new NotFoundException(`Tag #${id} not found!`);
    }

    return this.tagsRepository.save(tagType);
  }

  async remove(id: number) {
    const tag = await this.tagsRepository.findOne(id);
    if (!tag) {
      throw new NotFoundException();
    }
    return await this.tagsRepository.remove(tag);
  }

  async findByIds(tags: number[]) {
    return await this.tagsRepository.findByIds(tags);
  }
}
