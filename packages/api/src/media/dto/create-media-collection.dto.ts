import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateMediaCollectionDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  nameEn: string;

  @IsOptional()
  createdBy?: number;

  @IsOptional()
  tags?: [];

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsBoolean()
  isFeatured?: boolean;
}
