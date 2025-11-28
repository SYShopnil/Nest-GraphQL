import { forwardRef, Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';
import { UserModule } from 'src/user/user.module';
import { PostService } from './post.service';

@Module({
  imports: [forwardRef(() => UserModule)],
  providers: [PostResolver, PostService],
  exports: [PostService],
})
export class PostModule {}
