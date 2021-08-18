import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreatePermissionDto {
  @IsNotEmpty()
  ability: string;

  @IsOptional()
  roles?: [];
}
