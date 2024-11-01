import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateTagInput } from './create-tag.input';
import { IsUUID } from 'class-validator';

@InputType()
export class UpdateTagInput extends PartialType(CreateTagInput) {
  @Field(() => ID)
  @IsUUID()
  id: string;
}
