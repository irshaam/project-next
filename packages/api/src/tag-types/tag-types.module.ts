import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { TagTypesController } from './tag-types.controller';
import { TagTypesService } from './tag-types.service';

@Module({
  controllers: [TagTypesController],
  providers: [TagTypesService, PrismaService],
  exports: [TagTypesService],
})
export class TagTypesModule {}
