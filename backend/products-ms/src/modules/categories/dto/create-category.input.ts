import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { IsCategoryTitleUnique } from '../validators/is-category-title-unique';

@InputType()
export class CreateCategoryInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsCategoryTitleUnique()
  title: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  description: string;
  

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  parentId?: string;
}
