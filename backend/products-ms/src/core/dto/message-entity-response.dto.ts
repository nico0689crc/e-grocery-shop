import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class MessageEntityResponse {
  @Field({ nullable: true })
  message?: string;

  @Field(() => Int, { nullable: true })
  statusCode?: number;
}
