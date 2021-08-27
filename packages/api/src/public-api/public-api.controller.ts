import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseInterceptors,
  // Body,
  // Patch,
  // Param,
  // Delete,
} from '@nestjs/common';
import { RealIP } from 'nestjs-real-ip';
import { of } from 'rxjs';
import { Public } from 'src/auth/decorators/public.decorator';
import { PrismaService } from 'src/prisma';
import { nanoid } from 'src/shared/utils';

// import { CreatePostDto } from './dto/create-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';
// import { FileFieldsInterceptor } from '@nestjs/platform-express';

// import { CreatePostDto } from './dto/create-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';
// import { PostsService } from './posts.service';

@Controller('public')
export class PublicApiController {
  constructor(private prisma: PrismaService) {}
  @Public()
  @Get('home')
  async getHome() {
    const pageHeader = {
      title: 'Home',
    };

    const pageMeta = {
      title: 'Home',
      type: 'home',
      layout: 'base',
    };

    const heroBlock = await this.prisma.post.findMany({
      select: {
        id: true,
        slug: true,
        nanoid: true,
        featuredMedia: true,
        heading: true,
        publishedAt: true,
        createdAt: true,
        leadText: true,
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
            slug: true,
          },
        },
        // tags: {
        //   select: {
        //     id: true,
        //     name: true,
        //     slug: true,
        //   },
        // },
      },

      orderBy: {
        createdAt: 'desc',
      },
      skip: 4,
      take: 5,
    });

    const heroBlockFiltered = heroBlock.map((sub: any, idx: any) => {
      return {
        ...sub,
        featuredMedia: {
          url: `https://dhauru.imgix.net/samples/${idx}.jpg`,
          type: 'image',
          // meta: {
          //   time: null,
          //   thumbnail: null,
          // },
        },
        isBreaking: idx === 1 ? true : false,
        isLive: false,
        isDeveloping: false,
        publishedAt: sub.createdAt,
      };
    });

    // const featuredSubs = heroBlock.filter(
    //   (hero: any, idx: number) => idx !== 0,
    // );

    // dummy
    // umar
    const umaru = await this.prisma.post.findMany({
      select: {
        id: true,
        slug: true,
        nanoid: true,
        featuredMedia: true,
        heading: true,
        publishedAt: true,
        createdAt: true,
        leadText: true,
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
            slug: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
      skip: 8,
      take: 24,
    });

    const umaruFiltered = umaru.map((sub: any, idx: any) => {
      return {
        ...sub,
        featuredMedia: {
          url: `https://dhauru.imgix.net/samples/${idx}.jpg`,
          type: 'image',
          // meta: {
          //   time: null,
          //   thumbnail: null,
          // },
        },
        publishedAt: sub.createdAt,
        comments: Math.floor(Math.random() * 10),
      };
    });
    const vidoeFilered = umaru.map((sub: any, idx: any) => {
      return {
        ...sub,
        featuredMedia: {
          url: `https://dhauru.imgix.net/samples/${idx}.jpg`,
          thumbnail: `https://dhauru.imgix.net/samples/${idx}.jpg`,
          type: 'image',
          time: 1300,
          // meta: {
          //   time: null,
          //   thumbnail: null,
          // },
        },
        publishedAt: sub.createdAt,
      };
    });
    const imageFiltered = umaru.map((sub: any, idx: any) => {
      return {
        ...sub,
        featuredMedia: {
          url: `https://dhauru.imgix.net/samples/${idx}.jpg`,
          type: 'image',
          // meta: {
          //   time: null,
          //   thumbnail: null,
          // },
        },
        publishedAt: sub.createdAt,
        photos: Math.floor(Math.random() * 10),
      };
    });

    const editor = await this.prisma.post.findMany({
      select: {
        id: true,
        slug: true,
        nanoid: true,
        featuredMedia: true,
        heading: true,
        publishedAt: true,
        createdAt: true,
        leadText: true,
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
            slug: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
      skip: 32,
      take: 3,
    });

    const editorFiltered = editor.map((sub: any, idx: any) => {
      return {
        ...sub,
        featuredMedia: {
          url: `https://dhauru.imgix.net/samples/${idx}.jpg`,
          type: 'image',
          // meta: {
          //   time: null,
          //   thumbnail: null,
          // },
        },
        publishedAt: sub.createdAt,
        comments: Math.floor(Math.random() * 10),
      };
    });

    const blocks = [];

    blocks[0] = {
      id: await nanoid(),
      type: 'hero-block',
      featuredMain: { ...heroBlockFiltered[0] },
      featuredSub: [...heroBlockFiltered.filter((hero: any, idx: any) => idx !== 0)],
    };
    blocks[1] = {
      id: await nanoid(),
      type: 'readers-list-block',
      header: {
        title: 'އުމަރު، ކިޔާލަން ހާއްސަ',
        align: 'center',
      },
      featuredMain: [umaruFiltered[0], umaruFiltered[1], umaruFiltered[2], umaruFiltered[3]],
      featuredSub: [...umaruFiltered.filter((hero: any, idx: any) => idx > 3)],
    };
    blocks[2] = {
      id: await nanoid(),
      header: {
        title: 'އެޑިޓަރުގެ ހޮވުން',
        align: 'center',
      },
      type: 'editors-list-block',
      featuredMain: editorFiltered,
    };
    blocks[3] = {
      id: await nanoid(),
      type: 'tabbed-list-home-block',
      tabs: [
        {
          current: true,
          header: {
            title: 'އެންމެ ފަސް',
            readmoreUrl: '',
          },
          featuredMain: { ...editorFiltered[0] },
          featuredSub: [
            ...editorFiltered.filter((hero: any, idx: any) => idx > 0 && idx < 8),
            ...umaruFiltered.filter((hero: any, idx: any) => idx > 2 && idx < 8),
          ],
        },
        {
          current: false,
          header: {
            title: 'މަޤުބޫލު',
            readmoreUrl: '',
          },
          featuredMain: { ...umaruFiltered[0] },
          featuredSub: [...umaruFiltered.filter((hero: any, idx: any) => idx > 0 && idx < 8)],
        },
      ],
    };

    blocks[4] = {
      id: await nanoid(),
      type: 'post-block-grid',
      header: {
        title: 'ކުޅިވަރު',
        align: 'right',
        readmoreUrl: '',
        sponsorUrl: '',
        sponsorMedia: '',
      },

      featuredMain: [...umaruFiltered.filter((hero: any, idx: any) => idx < 4)],
    };
    blocks[5] = {
      id: await nanoid(),
      type: 'video-story-slide-block',
      header: {
        title: 'ވީޑިއޯ ސްޓޯރީ',
        align: 'right',
        readmoreUrl: '',
        sponsorUrl: '',
        sponsorMedia: '',
        theme: 'dark',
      },
      featuredMain: [...vidoeFilered.filter((hero: any, idx: any) => idx < 4)],
    };
    blocks[6] = {
      id: await nanoid(),
      type: 'post-list-block',
      header: {
        title: 'ޓެކްނޮލޮޖީ',
        align: 'right',
        readmoreUrl: '',
        sponsorUrl: '',
        sponsorMedia: '',
        theme: 'dark',
      },
      featuredMain: [...umaruFiltered.filter((hero: any, idx: any) => idx < 4)],
    };
    blocks[7] = {
      id: await nanoid(),
      type: 'podcast-list-block',
      header: {
        title: 'ޕޮޑްކާސްޓްސް',
        align: 'right',
        readmoreUrl: '',
      },
      featuredMain: umaruFiltered[2],
      featuredSub: [...umaruFiltered.filter((hero: any, idx: any) => idx > 2 && idx < 6)],
    };
    blocks[8] = {
      id: await nanoid(),
      type: 'rounded-list-block',
      header: {
        title: 'މީހުންގެ ވާހަކަ',
        align: 'right',
        sponsorUrl: '',
        sponsorMedia: '',
        readmoreUrl: '',
      },
      featuredMain: [...umaruFiltered.filter((hero: any, idx: any) => idx < 4)],
    };
    blocks[9] = {
      id: await nanoid(),

      type: 'tabbed-image-slide-block',
      tabs: [
        {
          current: true,
          id: await nanoid(),
          header: {
            title: 'ފޮޓޯ ގެލެރީ',
            readmoreUrl: '',
          },
          featuredMain: [...umaruFiltered.filter((hero: any, idx: any) => idx > 0 && idx < 3)],
        },
        {
          current: false,
          id: await nanoid(),
          header: {
            title: 'ފޮޓޯ ޚަބަރު',
            readmoreUrl: '',
          },
          featuredMain: [...imageFiltered.filter((hero: any, idx: any) => idx > 0 && idx < 3)],
        },
      ],
    };

    return {
      pageHeader,
      meta: pageMeta,
      blocks,
    };
    // return this.postsService.findOne(id);
  }

  @Public()
  @Get('category/:slug')
  async findByTag(@Param('slug') slug: string) {
    const category = await this.prisma.tag.findUnique({
      where: { slug: slug },
    });
    const pageHeader = {
      title: category.name,
    };

    const pageMeta = {
      title: category.name,
      type: 'category',
      layout: 'base',
    };

    const posts = await this.prisma.post.findMany({
      select: {
        id: true,
        slug: true,
        nanoid: true,
        featuredMedia: true,
        heading: true,
        publishedAt: true,
        createdAt: true,
        leadText: true,
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
            slug: true,
          },
        },
      },
      where: {
        categoryId: category.id,
      },
      take: 9,
    });

    const postsFeatured = posts.map((sub: any, idx: any) => {
      return {
        ...sub,
        featuredMedia: {
          url: `https://dhauru.imgix.net/samples/${idx}.jpg`,
          type: 'image',
          meta: {
            thumbnail: `https://dhauru.imgix.net/samples/${idx}.jpg`,
          },
        },
        publishedAt: sub.createdAt,
      };
    });
    const blocks = [];

    blocks[0] = {
      id: await nanoid(),
      type: 'hero-grid-block',
      header: {
        title: null,
        readmoreUrl: null,
      },
      featuredMain: { ...postsFeatured[0] },
      featuredSub: [...postsFeatured.filter((hero: any, idx: any) => idx > 0 && idx < 7)],
    };

    blocks[1] = {
      id: await nanoid(),
      type: 'category-grid-block',

      header: {
        title: 'މަޤުބޫލު',
        readmoreUrl: '',
      },
      featuredMain: { ...postsFeatured[0] },
      featuredSub: [...postsFeatured.filter((hero: any, idx: any) => idx > 0 && idx < 10)],
    };

    // 2

    //3
    blocks[2] = {
      id: await nanoid(),
      type: 'special-post-block',
      header: {
        title: 'ހާއްސަ ރިޕޯޓް',

        align: 'center',
        sponsorUrl: '',
        sponsorMedia: '',
        readmoreUrl: '',
      },
      featuredMain: postsFeatured[0],
    };

    blocks[3] = {
      id: await nanoid(),
      type: 'rounded-list-block',
      header: {
        title: 'ކުޅިވަރު ޝަހުސިއްޔަތު',

        align: 'right',
        sponsorUrl: '',
        sponsorMedia: '',
        readmoreUrl: '',
      },
      featuredMain: [...postsFeatured.filter((hero: any, idx: any) => idx < 4)],
    };

    blocks[4] = {
      id: await nanoid(),
      type: 'post-list-block',
      header: {
        title: 'ބާސްކެޓްބޯޅަ',
        align: 'right',
        readmoreUrl: '',
        sponsorUrl: '',
        sponsorMedia: '',
        theme: 'dark',
      },
      featuredMain: [...postsFeatured.filter((hero: any, idx: any) => idx < 4)],
    };
    blocks[5] = {
      id: await nanoid(),
      type: 'post-list-block',
      header: {
        title: 'ޓެނިސް',
        align: 'right',
        readmoreUrl: '',
        sponsorUrl: '',
        sponsorMedia: '',
        theme: 'dark',
      },
      featuredMain: [...postsFeatured.filter((hero: any, idx: any) => idx < 4)],
    };

    return {
      pageHeader,
      meta: pageMeta,
      blocks,
    };
  }
  @Public()
  @Get('sub-category/:slug')
  async findBySubTag(@Param('slug') slug: string) {
    const category = await this.prisma.tag.findUnique({
      where: { slug: slug },
    });
    const pageHeader = {
      title: category.name,
    };

    const pageMeta = {
      title: category.name,
      type: 'tag',
      layout: 'base',
    };

    const posts = await this.prisma.post.findMany({
      select: {
        id: true,
        slug: true,
        nanoid: true,
        featuredMedia: true,
        heading: true,
        publishedAt: true,
        createdAt: true,
        leadText: true,
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
            slug: true,
          },
        },
      },
      where: {
        categoryId: category.id,
      },
      take: 13,
    });

    const postsFeatured = posts.map((sub: any, idx: any) => {
      return {
        ...sub,
        featuredMedia: {
          url: `https://dhauru.imgix.net/samples/${idx}.jpg`,
          type: 'image',
          meta: {
            thumbnail: `https://dhauru.imgix.net/samples/${idx}.jpg`,
          },
        },
        publishedAt: sub.createdAt,
      };
    });
    const blocks = [];

    blocks[0] = {
      id: await nanoid(),
      type: 'hero-mini-grid-block',
      header: {
        title: null,
        readmoreUrl: null,
      },
      featuredMain: postsFeatured[0],
      featuredSub: [...postsFeatured.filter((hero: any, idx: any) => idx > 0 && idx < 4)],
    };

    blocks[1] = {
      id: await nanoid(),
      type: 'post-paginate-grid-block',
      header: {
        title: 'އެންމެ ފަސް',
        readmoreUrl: '',
      },
      featuredMain: [...postsFeatured.filter((hero: any, idx: any) => idx > 0 && idx < 14)],
      nextUrl: 'https://api.badha.io/public/paginate',
    };

    // 2

    return {
      pageHeader,
      meta: pageMeta,
      blocks,
    };
  }

  @Public()
  @Get('paginate')
  async paginate(@Param('slug') slug: string) {
    const posts = await this.prisma.post.findMany({
      select: {
        id: true,
        slug: true,
        nanoid: true,
        featuredMedia: true,
        heading: true,
        publishedAt: true,
        createdAt: true,
        leadText: true,
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
            slug: true,
          },
        },
      },
      where: {
        categoryId: 1,
      },
      take: 8,
    });

    const postsFeatured = posts.map((sub: any, idx: any) => {
      return {
        ...sub,
        featuredMedia: {
          url: `https://dhauru.imgix.net/samples/${idx}.jpg`,
          type: 'image',
          meta: {
            thumbnail: `https://dhauru.imgix.net/samples/${idx}.jpg`,
          },
        },
        publishedAt: sub.createdAt,
      };
    });
    return {
      posts: postsFeatured,
      nextUrl: 'https://api.badha.io/public/paginate',
    };
  }

  @Public()
  @Get('post/:nanoid')
  async getPostById(@Param('nanoid') nanoid: string) {
    const post = await this.prisma.post.findUnique({
      where: { nanoid: nanoid },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            icon: true,
            slug: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
            icon: true,
            slug: true,
          },
        },
        topic: {
          select: {
            id: true,
            name: true,
            icon: true,
            slug: true,
          },
        },
        location: {
          select: {
            id: true,
            name: true,
            icon: true,
            slug: true,
          },
        },
        authors: {
          select: {
            id: true,
            name: true,
            picture: true,
            slug: true,
          },
        },
        comments: {
          where: {
            parentId: {
              equals: null,
            },
          },
        },
      },
    });

    const meta = {
      title: post.heading,
      type: 'post',
      layout: 'base',
    };

    const comments = [];

    const header = {
      title: post.latinHeading,
    };

    return {
      header,
      meta,
      post,
      comments,
    };
  }

  // POST COMMENT
  @Public()
  @Post('comment')
  async createComment(@Body() data: any, @RealIP() ip: string) {
    const { postId } = data;

    if (!postId) {
      throw new Error('Cannot submit a comment this time!');
    }
    const postExist = await this.prisma.post.findUnique({ where: { id: Number(postId) } });

    if (!postExist) {
      throw new NotFoundException();
    }

    const formData = {
      name: data.name,
      comment: data.comment,
      ipAddress: ip,
    };

    if (data.postId) {
      formData['post'] = {
        connect: { id: data.postId },
      };
    }
    if (data.parentId) {
      formData['parent'] = {
        connect: { id: data.parentId },
      };
    }

    const comment = await this.prisma.comment.create({
      data: {
        ...formData,
      },
      include: {
        commenter: {
          select: {
            id: true,
          },
        },
        parent: {
          select: {
            id: true,
            name: true,
            createdAt: true,
          },
        },
      },
    });

    return {
      id: comment.id,
      name: comment.name,
      parentId: comment.parentId,
      createdAt: comment.createdAt,
      commentAt: {
        id: comment.parent.id,
        name: comment.parent.name,
      },
      user: comment.commenter,
      replies: [],
      likes: comment.positive,
      dislike: comment.positive,
    };
  }

  @Public()
  @Patch('comment/like')
  async updateCommentLike(@Body() data: any) {
    const { commentId } = data;

    if (!commentId) {
      throw new Error('Cannot process at this time!');
    }
    const commentExists = await this.prisma.post.findUnique({ where: { id: Number(commentId) } });

    if (!commentExists) {
      throw new NotFoundException();
    }

    const update = await this.prisma.$executeRaw(
      `update "comment" set positive = positive + 1 where id = ${commentId}`,
    );
    return {
      success: 'true',
    };
  }
  @Public()
  @Patch('comment/dislike')
  async updateCommentDisLike(@Body() data: any) {
    const { commentId } = data;

    if (!commentId) {
      throw new Error('Cannot process at this time!');
    }
    const commentExists = await this.prisma.post.findUnique({ where: { id: Number(commentId) } });

    if (!commentExists) {
      throw new NotFoundException();
    }

    const update = await this.prisma.$executeRaw(
      `update "comment" set negative = negative + 1 where id = ${commentId}`,
    );
    return {
      success: 'true',
    };
  }

  @Public()
  @Get('/navigation')
  getNavigation() {
    return [
      { name: 'ހަބަރު', slug: 'local-news', type: 'category', tags: [], open: false },
      { name: 'ރިޕޯޓް', slug: 'report', type: 'category', tags: [], open: false },
      {
        name: 'ވިޔަފާރި',
        slug: 'business',
        type: 'category',
        tags: [
          {
            name: 'އެޑްވަޓޯރިއަލް',
            slug: 'advertorial',
            type: 'tag',
          },
          {
            name: 'އިގްތިސޯދު',
            slug: 'economy',
            type: 'tag',
          },
          {
            name: 'ޓޫރިޒަމް',
            slug: 'tourism',
            type: 'tag',
          },
        ],
      },
      { name: 'މީހުން', slug: 'people', type: 'category', tags: [], open: false },
      { name: 'ދިރިއުޅުން', slug: 'living', type: 'category', tags: [], open: false },
      { name: 'ދިރިއުޅުން', slug: 'living', type: 'category', tags: [], open: false },
      {
        name: 'ކުޅިވަރު',
        slug: 'sports',
        type: 'category',
        tags: [
          { name: 'ބޭރު ކުޅިވަރު', slug: 'world-sports', type: 'tag' },
          { name: 'ރާއްޖެ ކުޅިވަރު', slug: 'local-sports', type: 'tag' },
        ],
      },
      { name: 'ދުނިޔެ', slug: 'world', type: 'category', tags: [], open: false },
      { name: 'ސައިންސް', slug: 'science', type: 'category', tags: [], open: false },
      { name: 'ޓެކްނޮލޮޖީ', slug: 'technology', type: 'category', tags: [], open: false },
      { name: 'އިންޓަރެކްޓިވް', slug: 'interactive', type: 'category', tags: [], open: false },
    ];
  }
}
