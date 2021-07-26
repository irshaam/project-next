import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsEntity } from './entities/posts.entity';
@Module({
  imports: [TypeOrmModule.forFeature([PostsEntity])],
})
export class PostsModule {}
