import { ForbiddenError } from '@casl/ability';
import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

import { PrismaService } from '../prisma';
// import { TagsService } from '../tags/tags.service';

// import { CreateMediaDto } from './dto/create-media.dto';
// import { UpdateMediaDto } from './dto/update-media.dto';
// import { UploadService } from './upload.service';

@Injectable({ scope: Scope.REQUEST })
export class MediaService {
  constructor(
    @Inject(REQUEST) private request: Request,
    private prisma: PrismaService,
  ) {}

  async findAll({ type = 'collections', page = 1, take = 5 }) {
    ForbiddenError.from(this.request.user.ability).throwUnlessCan(
      'read',
      'Media',
    );

    if (page < 0) {
      throw new BadRequestException('Page value should not be negative!!');
    }

    let data = [];
    let totalCount = 0;
    let totalPages = 0;
    const skip = (page - 1) * take;

    switch (type) {
      case 'collections':
        totalCount = await this.prisma.mediaCollection.count();
        totalPages = Math.ceil(totalCount / take);
        data = await this.prisma.mediaCollection.findMany({
          select: {
            id: true,
            name: true,
            nameEn: true,
            isFeatured: true,
            media: {
              select: {
                id: true,
              },
              take: 1,
            },
            _count: {
              select: { media: true },
            },
          },
          take: Number(take) || undefined,
          skip: Number(skip) || undefined,
          orderBy: {
            updatedAt: 'desc',
          },
        });
        break;
    }

    return {
      data,
      totalCount,
      currentPage: page || 0,
      totalPages,
    };
  }

  async createCollection(data: any) {
    const formData = {
      name: data.name,
      nameEn: data.nameEn,
    };

    // Creator

    formData['creator'] = {
      connect: { id: this.request.user.id },
    };

    // Sync Tags
    if (data.tags && data.tags.length > 0) {
      formData['tags'] = {
        connect: data.tags,
      };
    }

    const collection = await this.prisma.mediaCollection.create({
      data: { ...formData },
    });

    return collection;
  }

  //   const or =
  //     type != 'all'
  //       ? {
  //           tagType: {
  //             slug: type,
  //           },
  //         }
  //       : {};

  //   return this.prisma.tag.findMany({
  //     include: {
  //       child: {
  //         select: {
  //           id: true,
  //           name: true,
  //           nameEn: true,
  //         },
  //       },
  //       tagType: {
  //         select: {
  //           id: true,
  //           name: true,
  //           slug: true,
  //         },
  //       },
  //     },
  //     where: {
  //       ...or,
  //     },
  //     orderBy: {
  //       createdAt: 'desc',
  //     },
  //   });
  // }

  // CreateMediaDto

  /** Collection */

  async findOneCollection(id: string) {
    const collection = await this.prisma.mediaCollection.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        tags: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        media: {
          select: {
            id: true,
            file: true,
            originalFilename: true,
            path: true,
            contentSize: true,
            mimeType: true,
            type: true,
            caption: true,
            captionEn: true,
            hasWatermark: true,
            isActive: true,
            isFeatured: true,
          },
        },
      },
    });

    return collection;
  }

  // async create(data: any) {
  // const mediaParams = {
  //   type: 'media',
  //   caption: createMediaDto.caption,
  //   captionEn: createMediaDto.captionEn,
  // };
  // if (createMediaDto.tags) {
  //   const tagsArray = createMediaDto.tags.split(',');
  //   const tags = await this.tagService.findByIds(tagsArray);
  //   mediaParams['tags'] = tags;
  // }

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

  // for (let i = 0; i < files.length; i++) {
  //   this.uploadService.upload(files[i], mediaParams);
  // }

  // return 'success';
  // }

  // async findAll() {
  //   return await this.mediaRepository.find();
  // }

  // async findOne(id: number) {
  //   return await this.mediaRepository.findOne(id, {
  //     relations: ['tags', 'collection'],
  //   });
  // }

  // update(id: number, updateMediaDto: UpdateMediaDto) {
  //   return `This action updates a #${id} media`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} media`;
  // }

  // async findAllCollections() {
  //   return await this.mediaCollectionRepository.find({
  //     relations: ['media'],
  //   });
  // }
}
