import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  HttpCode,
} from '@nestjs/common';

import { CreateTagTypeDto } from './dto/create-tag-type.dto';
import { UpdateTagTypeDto } from './dto/update-tag-type.dto';
import { TagTypesService } from './tag-types.service';

@Controller('tag-types')
export class TagTypesController {
  constructor(private readonly tagTypesService: TagTypesService) {}
  @Post()
  create(@Body() createTagTypeDto: CreateTagTypeDto) {
    return this.tagTypesService.create(createTagTypeDto);
  }

  @Get()
  findAll() {
    return this.tagTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tagTypesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTagTypeDto: UpdateTagTypeDto) {
    return this.tagTypesService.update(id, updateTagTypeDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: number) {
    return this.tagTypesService.remove(id);
  }
}
