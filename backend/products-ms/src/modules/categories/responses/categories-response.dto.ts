import { ObjectType, Field } from '@nestjs/graphql';
import { FindAllResponse } from 'src/core/dto/find-all-response.dto';
import { MessageEntityResponse } from 'src/core/dto/message-entity-response.dto';
import { Category } from '../entities/category.entity';

@ObjectType()
export class CategoriesFindAllResponse extends FindAllResponse {
  @Field(() => [Category])
  data: Category[];
}

@ObjectType()
export class CategoriesResponse extends MessageEntityResponse {
  @Field(() => CategoriesFindAllResponse, { nullable: true })
  result?: CategoriesFindAllResponse;
}