import { Module } from '@nestjs/common';

import { TagTypesController } from './tag-types.controller';
import { TagTypesService } from './tag-types.service';

@Module({
  controllers: [TagTypesController],
  providers: [TagTypesService],
  exports: [TagTypesService],
})
export class TagTypesModule {}
