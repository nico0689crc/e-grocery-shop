import { ObjectType, Field } from '@nestjs/graphql';
import { FindAllResponse } from 'src/core/dto/find-all-response.dto';
import { Tag } from '../entities/tag.entity';

@ObjectType()
export class TagsFindAllResponse extends FindAllResponse {
  @Field(() => [Tag])
  data: Tag[];
}
