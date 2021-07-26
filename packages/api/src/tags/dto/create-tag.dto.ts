import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  name_en: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsNumber()
  typeId: number;

  @IsOptional()
  @IsNumber()
  parentId?: number;

  @IsOptional()
  image?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  accent_color?: string;

  @IsOptional()
  @IsString()
  og_image?: string;

  @IsOptional()
  @IsOptional()
  og_title?: string;

  @IsOptional()
  @IsOptional()
  og_description?: string;

  @IsOptional()
  @IsOptional()
  twitter_image?: string;

  @IsOptional()
  @IsOptional()
  twitter_title?: string;

  @IsOptional()
  @IsOptional()
  twitter_description?: string;

  @IsOptional()
  @IsOptional()
  meta_title?: string;

  @IsOptional()
  @IsOptional()
  meta_description?: string;
}
