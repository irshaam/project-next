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
  APPROVED = 'approved',
  PUBLISHED = 'published',
  UN_PUBLISHED = 'unpublished',
  ARCHIEVED = 'archived',
}

export class CreatePostDto {
  @IsOptional()
  slug?: string;

  @IsNotEmpty()
  categoryId: number;

  // HEADER
  @IsOptional()
  @IsString()
  heading: string;

  @IsOptional()
  @IsString()
  headingDetailed?: string;

  @IsOptional()
  @IsString()
  latinHeading?: string;

  @IsOptional()
  @IsString()
  leadText?: string;

  // HEADER

  @IsOptional()
  @IsString()
  highlights?: string;

  @IsOptional()
  topicId?: number;

  @IsOptional()
  @IsString()
  featuredMedia?: string;

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
  // @IsBoolean()
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

  @IsOptional()
  createdBy?: number;

  @IsOptional()
  createdAt?: number;

  @IsOptional()
  tags?: [];

  @IsOptional()
  authors?: [];

  @IsOptional()
  editedBy?: number;

  @IsOptional()
  editedAt?: number;

  @IsOptional()
  editorComment?: string;

  @IsOptional()
  publishedBy?: number;

  @IsOptional()
  publishedAt?: number;

  @IsOptional()
  scheduledAt?: number;
}
