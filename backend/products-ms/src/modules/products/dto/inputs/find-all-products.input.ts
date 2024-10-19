import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class FindAllProductsInput {
  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field(() => [String], { nullable: true })
  categories?: string[];

  @Field(() => String, { nullable: true })
  search?: string;

  @Field(() => Int, { nullable: true })
  page?: number;

  @Field(() => Int, { nullable: true })
  pageSize?: number;
}
