import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserObject } from 'src/user/dtos/user.dto';

@ObjectType('Post')
export class PostObject {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field(() => UserObject)
  postBy: UserObject;

  @Field()
  userId: string;
}
