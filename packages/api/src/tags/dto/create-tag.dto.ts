import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  nameEn: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  descriptionEn?: string;

  @IsNotEmpty()
  @IsNumber()
  typeId: number;

  @IsOptional()
  parentId?: number;

  @IsOptional()
  image?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  accentColorr?: string;

  @IsOptional()
  @IsString()
  ogImage?: string;

  @IsOptional()
  @IsOptional()
  ogTitle?: string;

  @IsOptional()
  @IsOptional()
  ogDescription?: string;

  @IsOptional()
  @IsOptional()
  twitterImage?: string;

  @IsOptional()
  @IsOptional()
  twitterTilte?: string;

  @IsOptional()
  @IsOptional()
  twitterDescription?: string;

  @IsOptional()
  @IsOptional()
  metaTitle?: string;

  @IsOptional()
  @IsOptional()
  metaDescription?: string;
}
