import { PartialType } from '@nestjs/mapped-types';
import { IsNumber } from 'class-validator';

import { CreateTagTypeDto } from './create-tag-type.dto';

export class UpdateTagTypeDto extends PartialType(CreateTagTypeDto) {
  @IsNumber()
  id: number;
}
