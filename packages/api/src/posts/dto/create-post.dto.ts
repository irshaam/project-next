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
  @IsString()
  heading: string;

  @IsOptional()
  @IsString()
  headingDetailed?: string;

  @IsOptional()
  @IsString()
  latinHeading?: string;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @IsOptional()
  @IsNumber()
  topicId?: number;

  @IsNotEmpty()
  slug?: string;

  @IsOptional()
  @IsString()
  featuredMedia?: string;

  @IsOptional()
  @IsString()
  leadText?: string;

  @IsOptional()
  @IsString()
  hightlights?: string;

  @IsOptional()
  content?: string;

  @IsOptional()
  contentHtml?: string;

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
  currentVersion?: number;

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

  @IsOptional()
  locationId: number;
}
