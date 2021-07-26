import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/users.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user-create.dto';
import { UserDto } from './dto/user.dto';
import { toUserDto } from '../shared/mapper';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userCreateDto: UserCreateDto): Promise<UserDto> {
    const { email } = userCreateDto;
    // Check if User Exists with same email
    const userWithSameEmail = await this.userRepository.findOne({
      where: { email: email.toLowerCase() },
    });

    if (userWithSameEmail) {
      throw new BadRequestException('Email already in use');
    }
    // Create New Record
    const user = this.userRepository.create(userCreateDto);
    await this.userRepository.save(user);

    return user;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findByLogin(username: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ where: { email: username } });
  }
}
