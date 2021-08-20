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

      const formData = {
        contentSize: file.size,
        file: filename,
        originalFilename: file.originalname,
        type: file.mimetype ? file.mimetype.split('/')[0] : null,
        contentType: meta.type,
        path: key,
        mimeType: file.mimetype,
        caption: meta.caption ? meta.caption : null,
        captionEn: meta.captionEn ? meta.captionEn : null,
      };

      if (meta.collection) {
        formData['collection'] = {
          connect: { id: meta.collection },
        };
      }
      /**
       * Attach Tags
       */
      if (meta.tags && meta.tags.length > 0) {
        formData['tags'] = {
          connect: meta.tags,
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
