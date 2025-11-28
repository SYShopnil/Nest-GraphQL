import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/db/db.service';
import { CreateUserBody } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: DatabaseService) {}

  async findAllUser() {
    const users = await this.prisma.user.findMany();
    return users;
  }
  async findUserById(userId: string) {
    return await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
  }
  async findProfile(userId: string) {
    return await this.prisma.profile.findFirst({
      where: {
        id: userId,
      },
    });
  }

  async registerUser({ name, role, profile }: CreateUserBody) {
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          name,
          role,
          profile: {
            create: profile,
          },
        },
      });

      return user;
    });
  }
}
