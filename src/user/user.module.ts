import { forwardRef, Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { ProfileResolver } from './profile.resolver';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [forwardRef(() => PostModule)],
  providers: [UserResolver, UserService, ProfileResolver],
  exports: [UserService],
})
export class UserModule {}
