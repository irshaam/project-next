import { ForbiddenError } from '@casl/ability';
import { BadRequestException, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { nanoid } from 'nanoid';
import { PrismaService } from 'src/prisma';

@Injectable({ scope: Scope.REQUEST })
export class PostsService {
  constructor(@Inject(REQUEST) private request: Request, private prisma: PrismaService) {}

  /**
   * Find All by ID
   */
  async findAll({ type = 'all', page = 1, take = 15 }: { type?: string; page?: number; take?: number }) {
    //  check for permission
    ForbiddenError.from(this.request.user.ability).throwUnlessCan('read', 'Post');

    let or: any = '';

    const types = {
      draft: 'draft',
      copydesk: 'review',
      rejected: 'rejected',
      bank: 'approved',
      scheduled: 'scheduled',
      published: 'published',
      // 'unpublished',
      // 'archived',
    };

    if (type !== 'all') {
      or = {
        status: types[type],
      };
    }

    switch (types[type]) {
      case 'draft':
        or = {
          ...or,
          OR: [
            {
              authors: {
                every: {
                  id: { in: [this.request.user.id] },
                },
              },
            },
          ],
        };
        break;
      case 'review':
        if (this.request.user.ability.cannot('moderate', 'Post')) {
          or = {
            ...or,
            OR: [
              {
                authors: {
                  every: {
                    id: { in: [this.request.user.id] },
                  },
                },
              },
            ],
          };
        }
        break;
      case 'rejected':
        if (this.request.user.ability.cannot('moderate', 'Post')) {
          or = {
            ...or,
            OR: [
              {
                authors: {
                  every: {
                    id: { in: [this.request.user.id] },
                  },
                },
              },
            ],
          };
        } else {
          or = {
            ...or,
            OR: [
              {
                authors: {
                  every: {
                    id: { in: [this.request.user.id] },
                  },
                },
              },
              {
                editedBy: this.request.user.id,
              },
            ],
          };
        }

        break;
    }

    //
    // }

    if (!page) {
      page = 1;
    }
    if (!take) {
      take = 15;
    }

    if (page < 0) {
      throw new BadRequestException('Page value should not be negative!!');
    }

    let data = [];
    let totalCount = 0;
    let totalPages = 0;
    const skip = (page - 1) * take;

    totalCount = await this.prisma.post.count({
      where: {
        ...or,
      },
    });
    totalPages = Math.ceil(totalCount / take);

    data = await this.prisma.post.findMany({
      select: {
        id: true,
        headingDetailed: true,
        nanoid: true,
        createdAt: true,

        updatedAt: true,
        isLocked: true,
        isFeatured: true,
        isPublished: true,
        status: true,
        authors: {
          select: {
            id: true,
            name: true,
            nameEn: true,
          },
        },
        editor: {
          select: {
            id: true,
            name: true,
            nameEn: true,
          },
        },
        category: {
          select: {
            name: true,
            nameEn: true,
            id: true,
            typeId: true,
          },
        },
      },

      where: {
        ...or,
      },
      take: Number(take) || undefined,
      skip: Number(skip) || undefined,

      orderBy: {
        updatedAt: 'desc',
      },
    });

    return {
      data,
      totalCount,
      currentPage: page || 0,
      totalPages,
    };
  }

  /**
   * Find One by ID
   */
  findOne = async (id: string) => {
    ForbiddenError.from(this.request.user.ability).throwUnlessCan('read', 'Post');
    const post = await this.prisma.post.findUnique({
      where: {
        nanoid: id,
      },
      include: {
        authors: {
          select: {
            id: true,
            name: true,
            nameEn: true,
          },
        },
        category: {
          select: {
            name: true,
            id: true,
            typeId: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    });
    if (!post) {
      throw new NotFoundException(`Post #${id} not found!`);
    }

    if (post.status === 'review' && post.editedBy === null) {
      // ForbiddenError.from(this.request.user.ability).throwUnlessCan(
      //   'moderate',
      //   'Post',
      // );
      console.log(this.request.user.ability.can('moderate', 'Post'));
      await this.prisma.post.update({
        where: {
          nanoid: post.nanoid,
        },
        data: {
          editor: {
            connect: {
              id: this.request.user.id,
            },
          },
        },
      });
    }

    return post;
  };

  /** Create Post */
  async create(data: any) {
    ForbiddenError.from(this.request.user.ability).throwUnlessCan('create', 'Post');
    const nanoId = nanoid(9);

    // const { heading, latinHeading, categoryId, slug, content } = data
    const formData = {
      heading: data.heading,
      headingDetailed: data.headingDetailed,
      latinHeading: data.latinHeading,
      leadText: data.leadText,
      highlights: data.highlights,
      featuredMedia: data.featuredMedia,
      content: data.content,
      nanoid: nanoId,
      showAuthors: data.showAuthors,
      // creator: {
      //   connect: { id: this.request.user.id },
      // },
      // updater: {
      //   connect: { id: this.request.user.id },
      // },
    };

    if (data.slug) {
      formData['slug'] = data.slug;
    }

    if (data.createdAt) {
      formData['createdAt'] = new Date(data.createdAt).toISOString();
    }

    if (data.locationId) {
      formData['location'] = {
        connect: { id: data.locationId },
      };
    }

    if (data.topicId) {
      formData['topic'] = {
        connect: { id: data.topicId },
      };
    }

    // Attach Category Tag
    if (data.categoryId) {
      formData['category'] = {
        connect: { id: data.categoryId },
      };
    }

    // Attach Category Tag
    if (data.locationId) {
      formData['location'] = {
        connect: { id: data.locationId },
      };
    }

    // Sync Tags
    if (data.tags && data.tags.length > 0) {
      formData['tags'] = {
        connect: data.tags,
      };
    }
    // Sync Tags
    if (data.authors && data.authors.length > 0) {
      formData['authors'] = {
        connect: data.authors,
      };
    }
    console.log(formData);
    const post = await this.prisma.post.create({
      data: {
        ...formData,
      },
    });

    return post;
  }

  /**
   * Update Post
   */

  async update(id: string, data: any) {
    let formData = {};
    // Check user persmissions to change status
    const { status } = data;
    console.log();
    if (status !== 'draft') {
      console.log(status);
    }
    // if (data.status != 'draft' || data.status != 'review') {
    //   ForbiddenError.from(this.request.user.ability).throwUnlessCan('moderate', 'Post');
    //   console.log('adasd');
    // }

    if (data.status === 'rejected' && data.editedBy != this.request.user.id) {
      console.log(this.request.user.id);
      throw new Error('you cant edit this');
    }

    if (data.status === 'scheduled' && data.editedBy != this.request.user.id) {
      console.log(this.request.user.id);
      throw new Error('you cant edit this');
    }

    const types = {
      draft: 'draft',
      copydesk: 'review',
      rejected: 'rejected',
      bank: 'approved',
      scheduled: 'scheduled',
      published: 'published',
      // 'unpublished',
      // 'archived',
    };

    formData = {
      ...formData,
      slug: data.slug,
      heading: data.heading,
      headingDetailed: data.headingDetailed,
      latinHeading: data.latinHeading,
      leadText: data.leadText,
      highlights: data.highlights,
      featuredMedia: data.featuredMedia,
      content: data.content,
      showAuthors: data.showAuthors,
      status: data.status,
      editorComment: data.editorComment,
    };

    if (data.locationId) {
      formData['location'] = {
        connect: { id: data.locationId },
      };
    }

    if (data.topicId) {
      formData['topic'] = {
        connect: { id: data.topicId },
      };
    }

    // Attach Category Tag
    if (data.categoryId) {
      formData['category'] = {
        connect: { id: data.categoryId },
      };
    }
    // Attach Category Tag
    if (data.locationId) {
      formData['location'] = {
        connect: { id: data.locationId },
      };
    }

    // Sync Tags
    if (data.tags && data.tags.length > 0) {
      formData['tags'] = {
        set: data.tags,
      };
    }
    // Sync Tags
    if (data.authors && data.authors.length > 0) {
      formData['authors'] = {
        set: data.authors,
      };
    }

    if (data.createdAt) {
      formData['createdAt'] = new Date(data.createdAt).toISOString();
    }

    const post = await this.prisma.post.update({
      where: {
        nanoid: id,
      },
      data: {
        ...formData,
        updater: {
          connect: { id: this.request.user.id },
        },
      },

      include: {
        tags: true,
      },
    });

    return post;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
