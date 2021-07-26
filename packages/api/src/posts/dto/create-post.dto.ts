import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';

export enum PostStatus {
  DRAFT = 'draft',
  REVIEW = 'review',
  REJECTED = 'rejected',
  PUBLISHED = 'published',
  UN_PUBLISHED = 'unpublished',
  ARCHIEVED = 'archived',
}

export class CreatePostDto {
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsNumber()
  topicId?: number;

  @IsNotEmpty()
  slug: string;

  @IsOptional()
  @IsString()
  featured_image?: string;

  @IsNotEmpty()
  @IsString()
  heading: string;

  @IsOptional()
  @IsString()
  heading_detailed?: string;

  @IsOptional()
  @IsString()
  latin_heading?: string;

  @IsOptional()
  @IsString()
  lead_text?: string;

  @IsOptional()
  @IsString()
  hightlights?: string;

  @IsOptional()
  content?: string;

  @IsOptional()
  content_html?: string;

  @IsOptional()
  @IsString()
  feedback?: string;

  @IsOptional()
  @IsString()
  changes?: string;

  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;

  @IsOptional()
  current_version?: number;

  @IsOptional()
  @IsBoolean()
  isLocked?: boolean;

  @IsOptional()
  @IsBoolean()
  showAuthors?: boolean;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;

  @IsOptional()
  layout?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
