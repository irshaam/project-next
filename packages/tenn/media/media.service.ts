import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsService } from 'src/tags/tags.service';
import { Repository } from 'typeorm';

import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { MediaCollection } from './entities/media-collection.entity';
import { Media } from './entities/media.entity';
import { UploadService } from './upload.service';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    @InjectRepository(MediaCollection)
    private readonly mediaCollectionRepository: Repository<MediaCollection>,
    private uploadService: UploadService,
    private tagService: TagsService,
  ) {}
  // CreateMediaDto
  async create(files, createMediaDto: any) {
    const mediaParams = {
      type: 'media',
      caption: createMediaDto.caption,
      captionEn: createMediaDto.captionEn,
    };

    if (createMediaDto.tags) {
      const tagsArray = createMediaDto.tags.split(',');
      const tags = await this.tagService.findByIds(tagsArray);
      mediaParams['tags'] = tags;
    }

    // if (createMediaDto.name && createMediaDto.name_en) {
    //   const mediaCollection = new MediaCollection();
    //   mediaCollection.name_en = createMediaDto.name_en;
    //   mediaCollection.name = createMediaDto.name;
    //   mediaCollection.tags = tags;
    //   const collection = await this.mediaCollectionRepository.save(
    //     mediaCollection,
    //   );
    //   mediaParams['collection'] = collection;
    // }

    for (let i = 0; i < files.length; i++) {
      this.uploadService.upload(files[i], mediaParams);
    }

    return 'success';
  }

  async findAll() {
    return await this.mediaRepository.find();
  }

  async findOne(id: number) {
    return await this.mediaRepository.findOne(id, {
      relations: ['tags', 'collection'],
    });
  }

  update(id: number, updateMediaDto: UpdateMediaDto) {
    return `This action updates a #${id} media`;
  }

  remove(id: number) {
    return `This action removes a #${id} media`;
  }

  async findAllCollections() {
    return await this.mediaCollectionRepository.find({
      relations: ['media'],
    });
  }
}
