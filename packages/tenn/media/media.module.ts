import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from 'src/tags/tags.module';

import { MediaCollection } from './entities/media-collection.entity';
import { Media } from './entities/media.entity';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { UploadService } from './upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([Media, MediaCollection]), TagsModule],
  controllers: [MediaController],
  providers: [MediaService, UploadService],
  exports: [UploadService],
})
export class MediaModule {}
