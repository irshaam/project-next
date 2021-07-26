import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { UploadService } from '../media/upload.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private uploadService: UploadService,
  ) {}

  async create(files: any, createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    // Check if User Exists with same email
    const userWithSameEmail = await this.userRepository.findOne({
      where: { email: email.toLowerCase() },
    });

    if (userWithSameEmail) {
      throw new BadRequestException('Email already in use');
    }
    // Create New Record
    const user = this.userRepository.create(createUserDto);

    if (files && 'picture' in files) {
      const picture = await this.uploadService.upload(files.picture[0], {
        type: 'profile',
      });

      user.picture = picture.path;
    }

    if (files && 'cover_picture' in files) {
      const cover_picture = await this.uploadService.upload(files.picture[0], {
        type: 'profile_cover',
      });

      user.cover_picture = cover_picture.path;
    }

    await this.userRepository.save(user);

    return user;
  }

  findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.userRepository.findOne(id);
  }

  async update(id: number, files: any, updateUserDto: UpdateUserDto) {
    // if (id != updateUserDto.id) {
    //   throw new BadRequestException();
    // }
    const { email } = updateUserDto;

    const uniqueEmail = await this.userRepository.findOne({
      where: { id: Not(id), email: email },
    });

    if (uniqueEmail) {
      throw new BadRequestException('Email already exist!');
    }

    if ('picture' in files) {
      const picture = await this.uploadService.upload(files.picture[0], {
        type: 'profile',
      });

      updateUserDto.picture = picture.path;
    }

    if ('cover_picture' in files) {
      const cover_picture = await this.uploadService.upload(files.picture[0], {
        type: 'profile_cover',
      });

      updateUserDto.cover_picture = cover_picture.path;
    }

    const user = await this.userRepository.preload({
      id: Number(id),
      // isActive: Boolean(updateUserDto.isActive),
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User #${id} not found!`);
    }

    return await this.userRepository.save(user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  findAllAuthors() {
    return this.userRepository.find();
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async findById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async findByUuid(id: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { uuid: id } });
  }
}
