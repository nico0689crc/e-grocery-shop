import { ObjectType, Field } from '@nestjs/graphql';
import { MessageEntityResponse } from 'src/core/dto/message-entity-response.dto';
import { Tag } from '../entities/tag.entity';

@ObjectType()
export class TagResponse extends MessageEntityResponse {
  @Field(() => Tag, { nullable: true })
  data?: Tag;
}
