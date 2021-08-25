import { Controller, Get, Post, Body, Req, Param, Patch, Query, Delete, HttpCode } from '@nestjs/common';

import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  findAll(@Query('page') page?: number, @Query('take') take?: number, @Query('type') type?: string) {
    return this.tagsService.findAll({ type });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagsService.findOne(+id);
  }

  @Post()
  create(@Body() createTagDto: CreateTagDto, @Req() req: any) {
    const user = req.user;
    return this.tagsService.create({ ...createTagDto, createdBy: user.id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.tagsService.remove(id);
  }
}
