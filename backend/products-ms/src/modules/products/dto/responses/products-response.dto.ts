import { ObjectType, Field } from '@nestjs/graphql';
import { MessageEntityResponse } from 'src/core/dto/message-entity-response.dto';
import { ProductsFindAllResponse } from './products-find-all-response.dto';

@ObjectType()
export class ProductsResponse extends MessageEntityResponse {
  @Field(() => ProductsFindAllResponse, { nullable: true })
  result?: ProductsFindAllResponse;
}
