import {
  // NotFoundException,
  Injectable,
  // BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { nanoid } from 'src/shared/utils';

// import { CreatePostDto } from './dto/create-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';
@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}
  // private readonly revisionsRepository: Repository<PostRevision>, // @InjectRepository(PostRevision) // private readonly postsRepository: Repository<Post>, // @InjectRepository(Post)

  async create(data: any) {
    const nanoId = await nanoid();

    const { heading, latinHeading, categoryId, slug, content } = data;
    const post = await this.prisma.post.create({
      data: {
        heading,
        latinHeading,
        slug,
        content,
        nanoid: nanoId,
        categoryId: categoryId && Number(categoryId),
      },
    });

    return post;
  }

  async findAll() {
    return await this.prisma.post.findMany({
      include: {
        category: {
          select: {
            name: true,
            id: true,
            typeId: true,
          },
        },
      },
    });
  }

  // async findOne(id: number) {
  //   const post = await this.postsRepository.findOne(id);
  //   if (!post) {
  //     throw new NotFoundException(`Post #${id} not found!`);
  //   }
  //   return post;
  // }

  // async update(id: number, updatePostDto: UpdatePostDto) {
  //   if (id != updatePostDto.id) {
  //     throw new BadRequestException();
  //   }

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
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} post`;
  // }
}
