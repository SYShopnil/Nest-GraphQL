import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { UserObject } from './dtos/user.dto';
import { UserService } from './user.service';
import { ProfileObject } from './dtos/profile.dto';
import { Logger } from '@nestjs/common';
import { PostObject } from 'src/post/dto/post.dto';
import { PostService } from 'src/post/post.service';

@Resolver(() => UserObject)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
  ) {}
  private readonly logger = new Logger(UserResolver.name);

  @ResolveField(() => ProfileObject, { name: 'profile' })
  async findProfile(@Parent() user: UserObject) {
    // console.log({ user });
    console.log(`hello`);
    return (await this.userService.findProfile(user.id)) as ProfileObject;
  }

  @ResolveField(() => UserObject, { name: 'user' })
  async getUser(@Parent() profile: ProfileObject) {
    return this.userService.findUserById(profile.id);
  }

  @ResolveField(() => PostObject, { name: 'posts' })
  async posts(@Parent() user: UserObject) {
    return this.postService.getPostsByUserId(user.id);
  }
}
