import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProfileObject } from './profile.dto';
import { PostObject } from 'src/post/dto/post.dto';

@ObjectType('User')
export class UserObject {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  role: string;

  @Field(() => ProfileObject)
  profile?: ProfileObject;

  @Field(() => [PostObject], { nullable: 'items' })
  posts?: PostObject[];
}
