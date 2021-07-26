import {
  NotFoundException,
  Injectable,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';

import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostRevision } from './entities/post-revision.entity';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(PostRevision)
    private readonly revisionsRepository: Repository<PostRevision>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    // const post = this.postsRepository.create(createPostDto);
    // return await this.postsRepository.save(post).catch((error) => {
    //   return error;
    // });
  }

  async findAll() {
    return await this.postsRepository.find({ relations: ['category'] });
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne(id);
    if (!post) {
      throw new NotFoundException(`Post #${id} not found!`);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    if (id != updatePostDto.id) {
      throw new BadRequestException();
    }

    // const { heading } = updatePostDto;

    // const uniqueName = await this.postsRepository.findOne({
    //   where: { id: Not(id), heading: heading },
    // });

    // if (uniqueName) {
    //   throw new BadRequestException('Post already exist!');
    // }

    // const post = await this.postsRepository.findOne(id);

    // if (!post) {
    //   throw new NotFoundException(`Post #${id} not found!`);
    // }

    // console.log('current:', post);

    // // const postUpdate = this.postsRepository.create(updatePostDto);

    // console.log('updates:', updatePostDto);

    // if (post.status === 'rejected' && updatePostDto.status === 'draft') {
    //   console.log('create new version');
    // }

    // const merged = this.postsRepository.merge(post, updatePostDto);

    // console.log('merged:', merged);

    // return this.postsRepository.save(post);
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
