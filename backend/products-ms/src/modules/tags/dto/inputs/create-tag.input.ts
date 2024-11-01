import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsNotEmpty } from 'class-validator';
import { IsTagTitleUnique } from '../../validators/is-tag-title-unique';

@InputType()
export class CreateTagInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsTagTitleUnique()
  name: string;
}
