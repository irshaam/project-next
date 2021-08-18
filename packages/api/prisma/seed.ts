import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const updateUser2 = await prisma.user.update({
    where: {
      id: 2,
    },
    data: {
      roles: {
        connect: [{ id: 4 }, { id: 6 }, { id: 3 }],
      },
    },
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
