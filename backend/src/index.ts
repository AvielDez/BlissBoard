import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here

  //   await prisma.users.create({
  //     data: {
  //       first_name: "Alice",
  //       last_name: "Wonderland",
  //       email: "alice.wonderland.io",
  //       password: "12341234",
  //       last_login: "2024-01-31T20:30:45.123Z",
  //     },
  //   });

  await prisma.boards.update({
    where: { id: 6 },
    data: {
      name: "It's little now",
    },
  });

  const allUsers = await prisma.users.findMany({
    include: {
      UserSettings: true,
      boards: true,
    },
  });
  console.dir(allUsers, { depth: null });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
