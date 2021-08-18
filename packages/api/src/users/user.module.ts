import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

// import { TypeOrmModule } from '@nestjs/typeorm';
// import { MediaModule } from 'src/media/media.module';

// import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PrismaModule],
  // imports: [TypeOrmModule.forFeature([User]), MediaModule],
  controllers: [UserController],
  providers: [
    UserService,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
  ],
  exports: [UserService],
})
export class UserModule {}
