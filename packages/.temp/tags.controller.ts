import { Controller, Get, Post } from '@nestjs/common';

import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  /**
   * Get Tag Types
   * @returns types
   */
  @Get('types')
  async getTypes() {
    return await this.tagsService.getTypes();
  }
}
