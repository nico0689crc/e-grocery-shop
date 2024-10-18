import { InputType, Field, Int, ID } from '@nestjs/graphql';
import { IsString, IsOptional, IsInt } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  @IsString()
  name: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  parentId?: string;

  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  referenceId?: number;
}