import { PartialType } from '@nestjs/mapped-types';
import {
  IsBooleanString,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // @IsNumberString()
  // id: number;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsBooleanString()
  isActive?: boolean;
}
