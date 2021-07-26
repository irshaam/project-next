import { Controller, Post, Body } from '@nestjs/common';

import { UserCreateDto } from './dto/user-create.dto';
import { UsersService } from './users.service';

// import { UserUpdateDto } from './dto/user-update.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() userCreateDto: UserCreateDto) {
    return this.usersService.create(userCreateDto);
  }
}
