import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaService } from 'src/prisma.service';

// import { PostMeta } from './entities/post-meta.entity';
// import { PostReview } from './entities/post-review.entity';
// import { PostRevision } from './entities/post-revision.entity';
// import { Post } from './entities/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService],
})
export class PostsModule {}
