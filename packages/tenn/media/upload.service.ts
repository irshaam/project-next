import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as mime from 'mime';
import { nanoid } from 'nanoid/async';
import { Repository } from 'typeorm';

import { aws_key, aws_secret, s3_bucket } from '../config';
import { Tag } from '../tags/entities/tag.entity';
import { TagsService } from '../tags/tags.service';

import { Media } from './entities/media.entity';

const client = new S3Client({
  credentials: {
    accessKeyId: aws_key,
    secretAccessKey: aws_secret,
  },
  region: 'ap-southeast-1',
});

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    private tagService: TagsService,
  ) {}
  async upload(
    file: Express.Multer.File,
    meta: {
      type: string;
      caption?: string;
      captionEn?: string;
      tags?: any[];
      collection?: any;
    },
  ) {
    console.log(file);
    const extension = mime.getExtension(file.mimetype);
    const name = await nanoid();
    const filename = `${name}.${extension}`;
    const key = `${meta.type}/${name}.${extension}`;
    const bucket = s3_bucket;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Body: file.buffer,
      ContentType: file.mimetype,
      Key: String(key),
      ACL: 'public-read',
    });

    try {
      const resp = await client.send(command);

      const media = new Media();

      /**
       * Attach Tags
       */
      if (meta.tags && meta.tags.length > 0) {
        media.tags = meta.tags;
      }

      media.contentSize = String(file.size);
      media.file = filename;
      media.original_filename = file.originalname;
      media.path = key;
      media.mimeType = file.mimetype;
      media.type = meta.type;
      media.caption = meta.caption;
      media.captionEn = meta.captionEn;
      media.collection = meta.collection;

      console.log(media);

      const upload = await this.mediaRepository.save(media);
      console.log(upload);
      return upload;
    } catch (e) {
      console.log(e);
      throw new UnprocessableEntityException();
    }
  }
}
