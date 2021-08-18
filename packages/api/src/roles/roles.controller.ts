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
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(Number(id));
  }

  @Get()
  findAll() {
    return this.rolesService.findAll();
  }
}
