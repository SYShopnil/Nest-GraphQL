import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/db/db.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: DatabaseService) {}
  async getPostsByUserId(userId: string) {
    return await this.prisma.post.findMany({
      where: {
        userId,
      },
    });
  }
}
