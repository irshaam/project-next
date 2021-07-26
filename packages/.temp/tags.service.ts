import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TagTypesEntity } from './entities/tag-types.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagTypesEntity)
    private readonly tagTypesRepository: Repository<TagTypesEntity>,
  ) {}

  async getTypes() {
    return await this.tagTypesRepository.find();
  }

  // async seedData(types: any[]) {
  //   types.map(async (type) => {
  //     const typeData = this.tagTypesRepository.create({
  //       id: type.id,
  //       name: type.name,
  //     });
  //     const resp = await this.tagTypesRepository.save(typeData);
  //     console.log(resp);
  //   });
  // }
}
