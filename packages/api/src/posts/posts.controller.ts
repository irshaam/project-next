import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseInterceptors,
  // Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
// import { FileFieldsInterceptor } from '@nestjs/platform-express';

// import { CreatePostDto } from './dto/create-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * Get all posts
   * @param page number
   * @returns Post[]
   */
  @Get()
  findAll(
    @Query('type') type?: string,
    @Query('page') page?: number,
    @Query('take') take?: number,
  ) {
    return this.postsService.findAll({ type, page, take });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Post()
  async create(@Body() createPostDto: CreatePostDto) {
    return await this.postsService.create(createPostDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postsService.update(id, updatePostDto);
  }

  //
  // @UseInterceptors(
  //   FileFieldsInterceptor([
  //     { name: 'picture', maxCount: 1 },
  //     { name: 'cover_picture', maxCount: 1 },
  //   ]),
  // )

  // @Get()
  //
  // findAll(
  //   @Query('take') take?: number,
  //   @Query('skip') skip?: number,
  //   @Query('searchString') searchString?: string,
  //   @Query('orderBy') orderBy?: 'asc' | 'desc',
  // ) {
  //   return this.postsService.findAll(take, skip, searchString, orderBy);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.postsService.remove(+id);
  // }
}
