import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
// import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { AuthModule } from './auth/auth.module';
// import * as ormconfig from './database/ormconfig';
// import { HealthController } from './health/health.controller';
import { HealthController } from './health/health.controller';
import { PostsModule } from './posts/posts.module';
import { PrismaService } from './prisma.service';
// import { MediaModule } from './media/media.module';
// import { PermissionsModule } from './permissions/permissions.module';
// import { RolesModule } from './roles/roles.module';
import { TagTypesModule } from './tag-types/tag-types.module';
import { TagsModule } from './tags/tags.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot(ormconfig),
    TagTypesModule,
    TagsModule,
    UserModule,
    // RolesModule,
    // PermissionsModule,
    PostsModule,
    // MediaModule,
    // AuthModule,
    TerminusModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
