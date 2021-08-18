import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  // Post,
  // Body,
  // Patch,
  // Param,
  // Delete,
  // UseInterceptors,
  // UploadedFiles,
  // Req,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/decorators/public.decorator';

// import { FilesInterceptor } from '@nestjs/platform-express';

// import { CreateMediaCollectionDto } from './dto/create-media-collection.dto';
// import { CreateMediaDto } from './dto/create-media.dto';
// import { UpdateMediaDto } from './dto/update-media.dto';
import { CreateMediaCollectionDto } from './dto/create-media-collection.dto';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  findAll(
    @Query('page') page?: number,
    @Query('take') take?: number,
    @Query('type') type?: string,
  ) {
    return this.mediaService.findAll({ type, page, take });
  }

  /**
   * Collection
   */
  @Post('collection')
  createCollection(@Body() createMediaCollectionDto: CreateMediaCollectionDto) {
    return this.mediaService.createCollection(createMediaCollectionDto);
  }

  @Get('collection/:id')
  findAllCollections(@Param('id') id: string) {
    return this.mediaService.findOneCollection(id);
  }
  @Public()
  @Post('upload')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() createMediaDto: any,
  ) {
    console.log(files);
    // return await this.mediaService.create(files, createMediaDto);
    // console.log(createMediaDto);
  }

  // @Post()
  // create(@Body() createMediaDto: CreateMediaDto, @Req() req: any) {
  //   const user = req.user;
  //   return this.mediaService.create({ ...createMediaDto, createdBy: user.id });
  // }

  // @Get('collection/:id')
  // findOneCollection(@Param('id') id: string) {
  //   return this.mediaService.findOneCollection(id);
  // }

  // @Post('upload')
  // @UseInterceptors(FilesInterceptor('files'))
  // async uploadFile(
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  //   @Body() createMediaDto: any,
  // ) {
  //   console.log(files);
  //   // return await this.mediaService.create(files, createMediaDto);
  //   // console.log(createMediaDto);
  // }
  // @Get()
  // findAll() {
  //   return this.mediaService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.mediaService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateMediaDto: UpdateMediaDto) {
  //   return this.mediaService.update(+id, updateMediaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.mediaService.remove(+id);
  // }
}
