import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagTypesEntity } from './entities/tag-types.entity';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
@Module({
  imports: [TypeOrmModule.forFeature([TagTypesEntity])],
  controllers: [TagsController],
  exports: [TagsService],
  providers: [TagsService],
})
export class TagsModule {}
