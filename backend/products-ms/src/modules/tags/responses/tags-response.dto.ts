import { ObjectType, Field } from '@nestjs/graphql';
import { FindAllResponse } from 'src/core/dto/find-all-response.dto';
import { MessageEntityResponse } from 'src/core/dto/message-entity-response.dto';
import { Tag } from '../entities/tag.entity';

@ObjectType()
export class TagsFindAllResponse extends FindAllResponse {
  @Field(() => [Tag])
  data: Tag[];
}

@ObjectType()
export class TagsResponse extends MessageEntityResponse {
  @Field(() => TagsFindAllResponse, { nullable: true })
  result?: TagsFindAllResponse;
}
