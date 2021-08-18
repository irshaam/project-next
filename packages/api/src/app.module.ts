import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
// import { HealthController } from './health/health.controller';
import { HealthController } from './health/health.controller';
import { MediaModule } from './media/media.module';
import { PermissionsModule } from './permissions/permissions.module';
import { PostsModule } from './posts/posts.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { PublicApiController } from './public-api/public-api.controller';
import { PublicApiModule } from './public-api/public-api.module';
// import { MediaModule } from './media/media.module';
import { RolesModule } from './roles/roles.module';
import { TagTypesModule } from './tag-types/tag-types.module';
import { TagsModule } from './tags/tags.module';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    PrismaModule.forRoot({
      isGlobal: true,
      prismaServiceOptions: {
        prismaOptions: { log: ['info'] },
        explicitConnect: true,
      },
    }),
    RolesModule,
    TagTypesModule,
    TagsModule,
    UserModule,
    PermissionsModule,
    PostsModule,
    MediaModule,
    AuthModule,
    TerminusModule,
    PublicApiModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
