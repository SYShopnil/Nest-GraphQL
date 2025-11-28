import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PostObject } from './dto/post.dto';
import { UserService } from 'src/user/user.service';
import { UserObject } from 'src/user/dtos/user.dto';

@Resolver(() => PostObject)
export class PostResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField(() => UserObject, { name: 'postBy' })
  async postBy(@Parent() post: PostObject) {
    return this.userService.findUserById(post.userId);
  }
}
