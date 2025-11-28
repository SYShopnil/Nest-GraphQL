import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserBody } from 'src/user/dtos/create-user.dto';
import { UserObject } from 'src/user/dtos/user.dto';
import { UserService } from 'src/user/user.service';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => [UserObject], { name: 'users' })
  async users() {
    return (await this.userService.findAllUser()) as UserObject[];
  }

  @Query(() => UserObject, { nullable: true, name: 'user' })
  async user(@Args('id', { type: () => String }) id: string) {
    return this.userService.findUserById(id);
  }

  @Mutation(() => UserObject, { name: 'createUser' })
  async createUser(
    @Args('createUserDto', { type: () => CreateUserBody })
    createUserDto: CreateUserBody,
  ) {
    return await this.userService.registerUser(createUserDto);
  }
}
