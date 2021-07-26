import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateTagTypeDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  layout: string;

  @IsOptional()
  meta: string;
}
