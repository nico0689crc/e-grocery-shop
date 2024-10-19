import { ObjectType, Field, Int } from '@nestjs/graphql';
import { FindAllResponse } from 'src/core/dto/find-all-response.dto';
import { Product } from '../../entities/product.entity';

@ObjectType()
export class ProductsFindAllResponse extends FindAllResponse {
  @Field(() => [Product])
  data: Product[];
}
