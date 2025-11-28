import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { ProfileObject } from './dtos/profile.dto';
import { UserObject } from './dtos/user.dto';
import { UserService } from './user.service';

@Resolver(() => ProfileObject)
export class ProfileResolver {
  constructor(private readonly userService: UserService) {}
  @ResolveField(() => UserObject, { name: 'user' })
  async user(@Parent() profile: ProfileObject) {
    return await this.userService.findUserById(profile.id);
  }
}
