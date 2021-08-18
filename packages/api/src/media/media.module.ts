import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TagsModule } from 'src/tags/tags.module';

import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { UploadService } from './upload.service';

@Module({
  imports: [PrismaModule, TagsModule],
  controllers: [MediaController],
  providers: [MediaService, UploadService],
  exports: [UploadService],
})
export class MediaModule {}
