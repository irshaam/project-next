import { IsNotEmpty, IsEmail, IsOptional, IsString } from 'class-validator';
interface Role {
  id: number;
  name?: string;
}
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  nameEn: string;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  picture?: string;

  @IsOptional()
  @IsString()
  coverPicture?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  bioEn?: string;

  @IsOptional()
  @IsString()
  twitter?: string;

  @IsOptional()
  facebook?: string;

  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  roles?: Role[];
}
