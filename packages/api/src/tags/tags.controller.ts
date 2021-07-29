import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
  // HttpCode,
  // Query,
} from '@nestjs/common';

import { CreateTagDto } from './dto/create-tag.dto';
// import { UpdateTagDto } from './dto/update-tag.dto';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }
  @Post()
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.create(createTagDto);
  }

  // @Get('category')
  // getCategories() {
  //   return this.tagsService.getCategories();
  // }

  // @Get('search')
  // async search(@Query('query') query: string) {
  //   if (query !== undefined && query.length > 1) {
  //     return await this.tagsService.search(query);
  //   }
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.tagsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
  //   return this.tagsService.update(+id, updateTagDto);
  // }

  // @Delete(':id')
  // @HttpCode(204)
  // remove(@Param('id') id: string) {
  //   return this.tagsService.remove(+id);
  // }
}
