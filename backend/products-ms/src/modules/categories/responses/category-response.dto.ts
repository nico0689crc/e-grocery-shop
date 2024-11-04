import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from '../entities/category.entity';
import { MessageEntityResponse } from 'src/core/dto/message-entity-response.dto';

@ObjectType()
export class CategoryResponse extends MessageEntityResponse {
  @Field(() => Category, { nullable: true })
  data?: Category;
}
