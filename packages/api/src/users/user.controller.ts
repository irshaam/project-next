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

  // Query,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'cover_picture', maxCount: 1 },
    ]),
  )
  async create(@Body() createUser: CreateUserDto) {
    return this.userService.create(createUser);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'cover_picture', maxCount: 1 },
    ]),
  )
  async update(
    @Param('id') id: number,
    @UploadedFiles() files: Express.Multer.File[],
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(id, files, updateUserDto);
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

  // @Delete()
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
