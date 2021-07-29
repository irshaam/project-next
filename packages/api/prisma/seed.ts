import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // const tagTypes = await prisma.tagType.createMany({
  //   data: [
  //     { name: 'Category', slug: 'category' },
  //     { name: 'System', slug: 'system' },
  //     { name: 'Topics', slug: 'topic' },
  //     { name: 'People', slug: 'people' },
  //     { name: 'Organization', slug: 'organization' },
  //     { name: 'Business', slug: 'business' },
  //     { name: 'Place', slug: 'place' },
  //     { name: 'Location', slug: 'location' },
  //     { name: 'Event', slug: 'event' },
  //   ],
  // });

  // console.log('Migrated:', tagTypes);

  const tags = await prisma.tag.createMany({
    data: [
      {
        createdBy: 1,
        typeId: 1,
        name: 'ރާއްޖެ',
        nameEn: 'Local',
        slug: 'local',
      },
      {
        createdBy: 1,
        typeId: 1,
        name: 'ރިޕޯޓް',
        nameEn: 'Report',
        slug: 'report',
      },
      {
        createdBy: 1,
        typeId: 1,
        name: 'ކުޅިވަރު',
        nameEn: 'Sports',
        slug: 'sports',
      },
      {
        typeId: 2,
        name: 'ކުއްލި ޚަބަރު',
        nameEn: 'Breaking News',
        createdBy: 1,
        slug: 'breaking-news',
      },
      {
        createdBy: 1,
        typeId: 2,
        name: 'ލައިވް ބްލޮގް',
        nameEn: 'Live Blog',
        slug: 'live-blog',
      },
      {
        createdBy: 1,
        typeId: 2,
        name: 'ޑިވެލޮޕިންގް',
        nameEn: 'Developoing',
        slug: 'developing',
      },
      {
        createdBy: 1,
        typeId: 1,
        name: 'ސައިންސް',
        nameEn: 'Science',
        slug: 'science',
      },
      {
        createdBy: 1,
        typeId: 1,
        name: 'ދުނިޔެ',
        nameEn: 'World',
        slug: 'world',
      },
      {
        createdBy: 1,
        typeId: 1,
        parentId: 3,
        name: 'ރާއްޖެ ކުޅިވަރު',
        nameEn: 'Local Sports',
        slug: 'local-sports',
      },
      {
        createdBy: 1,
        typeId: 1,
        parentId: 3,
        name: 'ބޭރު ކުޅިވަރު',
        nameEn: 'World Sports',
        slug: 'world-sports',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
