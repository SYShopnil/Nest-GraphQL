// src/db/db.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const connectionString = process.env.DATABASE_URL!;
    const adapter = new PrismaPg({ connectionString });

    // pass adapter into PrismaClient constructor
    // cast to any if TypeScript types don't expose 'adapter' yet
    super({ adapter } as unknown);
  }

  async onModuleInit() {
    await this.$connect();
    console.log('🚀 Database connected successfully!');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('🛑 Database disconnected.');
  }
}
