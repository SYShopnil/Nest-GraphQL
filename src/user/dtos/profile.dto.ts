import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserObject } from './user.dto';

@ObjectType('Profile')
export class ProfileObject {
  @Field(() => ID)
  id: string; // equals user.id per your prisma schema

  @Field()
  age: string;

  // optional back-reference
  @Field(() => UserObject)
  user: UserObject;
}
