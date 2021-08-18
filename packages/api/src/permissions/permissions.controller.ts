import {
  Controller,
  Get,
  Param,
  // Post,
  // Body,
  // UseGuards,
  // Req,
  // Patch,
  // Query,
  // Patch,
  // Param,
  // Delete,
  // HttpCode,
  // Query,
} from '@nestjs/common';

// import { CreateRoleDto } from './dto/create-role.dto';
// import { UpdateRoleDto } from './dto/update-role.dto';
import { PermissionsService } from './permissions.service';

@Controller('Permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionsService.findOne(Number(id));
  }

  @Get()
  findAll() {
    return this.permissionsService.findAll();
  }
}
