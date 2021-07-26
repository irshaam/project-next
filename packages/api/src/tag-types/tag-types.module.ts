import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagType } from './entities/tag-type.entity';
import { TagTypesController } from './tag-types.controller';
import { TagTypesService } from './tag-types.service';

@Module({
  imports: [TypeOrmModule.forFeature([TagType])],
  controllers: [TagTypesController],
  providers: [TagTypesService],
  exports: [TagTypesService],
})
export class TagTypesModule {}
