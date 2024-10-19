import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class FindAllResponse {
  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  pageSize: number;
}
