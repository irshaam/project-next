import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import * as mime from 'mime';
import { nanoid } from 'nanoid/async';
import { PrismaService } from 'src/prisma';

import { aws_key, aws_secret, s3_bucket } from '../config';

const client = new S3Client({
  credentials: {
    accessKeyId: aws_key,
    secretAccessKey: aws_secret,
  },
  region: 'ap-southeast-1',
});

@Injectable()
export class UploadService {
  constructor(private prisma: PrismaService) {}

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

      const formData: any = {};

      formData.contentSize = String(file.size);
      formData.file = filename;
      formData.original_filename = file.originalname;
      formData.path = key;
      formData.mimeType = file.mimetype;
      formData.type = meta.type;
      formData.caption = meta.caption;
      formData.captionEn = meta.captionEn;
      formData.collection = meta.collection;

      /**
       * Attach Tags
       */
      if (meta.tags && meta.tags.length > 0) {
        formData.tags = {
          connect: meta.tags.map((tag: any) => ({ id: tag })),
        };
      }

      /**
       * Create New Upload File
       */
      const upload = await this.prisma.media.create({
        data: {
          ...formData,
        },
      });

      return upload;
    } catch (e) {
      console.log(e);
      throw new UnprocessableEntityException();
    }
  }
}
