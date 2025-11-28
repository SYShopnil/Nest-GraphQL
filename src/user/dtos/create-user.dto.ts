import { Field, InputType } from '@nestjs/graphql';

@InputType('profileUserDto')
export class ProfileUserBody {
  @Field()
  age: string;
}

@InputType('createUserDto')
export class CreateUserBody {
  @Field()
  name: string;

  @Field()
  role: string;

  @Field(() => ProfileUserBody)
  profile: ProfileUserBody;
}
