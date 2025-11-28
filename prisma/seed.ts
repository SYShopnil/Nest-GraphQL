// // prisma/seed.js
// const { PrismaClient } = require('@prisma/client');
// const { PrismaPg } = require('@prisma/adapter-pg'); // <- use PrismaPg
// const { randomUUID } = require('crypto');

// async function run() {
//   const connectionString = process.env.DATABASE_URL;
//   if (!connectionString) {
//     console.error(
//       'Please set DATABASE_URL env var (postgresql://user:pass@host:port/db)',
//     );
//     process.exit(1);
//   }

//   // create adapter using connection string (PrismaPg manages the underlying pg client)
//   const adapter = new PrismaPg({ connectionString });

//   // pass adapter into PrismaClient
//   const prisma = new PrismaClient({ adapter });

//   try {
//     console.log('Start seeding ...');

//     await prisma.post.deleteMany();
//     await prisma.profile.deleteMany();
//     await prisma.user.deleteMany();

//     const usersData = [
//       {
//         name: 'Alice',
//         role: 'admin',
//         profile: { age: '30' },
//         posts: [
//           { id: randomUUID(), content: 'Hello from Alice' },
//           { id: randomUUID(), content: 'Another Alice post' },
//         ],
//       },
//       {
//         name: 'Bob',
//         role: 'user',
//         profile: { age: '25' },
//         posts: [{ id: randomUUID(), content: 'Bob first post' }],
//       },
//       {
//         name: 'Carol',
//         role: 'user',
//         posts: [],
//       },
//     ];

//     for (const u of usersData) {
//       const user = await prisma.user.create({
//         data: { name: u.name, role: u.role },
//       });

//       if (u.profile) {
//         await prisma.profile.create({
//           data: { id: user.id, age: u.profile.age },
//         });
//       }

//       for (const p of u.posts || []) {
//         await prisma.post.create({
//           data: { id: p.id, content: p.content, userId: user.id },
//         });
//       }
//     }

//     console.log('Seeding finished.');
//   } catch (err) {
//     console.error('Seed error:', err);
//     process.exitCode = 1;
//   } finally {
//     await prisma.$disconnect().catch(() => {});
//     // PrismaPg manages internal pg — no explicit pg.end() here
//   }
// }

// run();

// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { randomUUID } from 'crypto';

async function run() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error('DATABASE_URL not found');
    process.exit(1);
  }

  // Create adapter instance
  const adapter = new PrismaPg({ connectionString });

  // Create Prisma client WITH adapter
  const prisma = new PrismaClient({ adapter } as any);

  try {
    console.log('Start seeding...');

    await prisma.post.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();

    const usersData = [
      {
        name: 'Alice',
        role: 'admin',
        profile: { age: '30' },
        posts: [
          { id: randomUUID(), content: 'Hello from Alice' },
          { id: randomUUID(), content: 'Another Alice post' },
        ],
      },
      {
        name: 'Bob',
        role: 'user',
        profile: { age: '25' },
        posts: [{ id: randomUUID(), content: 'Bob first post' }],
      },
      {
        name: 'Carol',
        role: 'user',
        posts: [],
        profile: { age: '20' },
      },
    ];

    for (const u of usersData) {
      const user = await prisma.user.create({
        data: { name: u.name, role: u.role },
      });

      if (u.profile) {
        await prisma.profile.create({
          data: { id: user.id, age: u.profile.age },
        });
      }

      for (const p of u.posts ?? []) {
        await prisma.post.create({
          data: {
            id: p.id,
            content: p.content,
            userId: user.id,
          },
        });
      }
    }

    console.log('Seeding finished.');
  } catch (err) {
    console.error('Seed error:', err);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect().catch(() => {});
  }
}

run();
