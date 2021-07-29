import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

// import { TypeOrmModule } from '@nestjs/typeorm';
// import { MediaModule } from 'src/media/media.module';

// import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  // imports: [TypeOrmModule.forFeature([User]), MediaModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
