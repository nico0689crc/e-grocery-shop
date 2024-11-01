import { ObjectType, Field } from '@nestjs/graphql';
import { MessageEntityResponse } from 'src/core/dto/message-entity-response.dto';
import { TagsFindAllResponse } from './tags-find-all-response.dto';

@ObjectType()
export class TagsResponse extends MessageEntityResponse {
  @Field(() => TagsFindAllResponse, { nullable: true })
  result?: TagsFindAllResponse;
}
