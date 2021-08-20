import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  // Get,
  Post,
  UploadedFiles,
  UseInterceptors,
  // Patch,
  // Param,
  // Delete,
  Req,
  Query,
  Delete,
  HttpCode,
  // Query,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   *  Return all users
   * @returns Users
   */
  @Get()
  findAll(@Query('page') page?: number, @Query('take') take?: number) {
    return this.userService.findAll({ page, take });
  }

  @Post()
  async create(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.update(id, updateUserDto);
  }

  @Get('authors')
  findAllAuthors() {
    return this.userService.findAllAuthors();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(Number(id));
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  // @Post()
  // @UseInterceptors(
  //   FileFieldsInterceptor([
  //     { name: 'picture', maxCount: 1 },
  //     { name: 'cover_picture', maxCount: 1 },
  //   ]),
  // )
  // async create(
  //   @UploadedFiles() files: Express.Multer.File[],
  //   @Body()
  //   createUserDto: CreateUserDto,
  // ): Promise<UserModal> {
  //   // return this.userService.create(files, createUserDto);
  // }

  // @Get('authors')
  // findAllAuthors() {
  //   return this.userService.findAllAuthors();
  // }
}
