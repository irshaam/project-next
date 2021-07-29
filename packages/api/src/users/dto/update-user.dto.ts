import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // @IsNumberString()
  // id: number;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
