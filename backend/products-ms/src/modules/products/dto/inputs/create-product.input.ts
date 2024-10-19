import { InputType, Field, Float, ID } from '@nestjs/graphql';
import {
  IsString,
  IsInt,
  IsEnum,
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  Min,
  ArrayNotEmpty,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAttachmentInput } from 'src/modules/attachments/dto/create-attachment.input';
import { CreateCategoryInput } from 'src/modules/categories/dto/create-category.input';
import { IsCategoriesExist } from 'src/modules/categories/validators/is-categories-exist.validator';
import { ProductStatus } from '../../entities/product.entity';
import { IsTagsExist } from '../../validators/is-tags-exist.validator';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  description: string;

  @Field(() => Number)
  @IsInt()
  stock: number;

  @Field(() => ProductStatus, { defaultValue: ProductStatus.PUBLISHED })
  @IsEnum(ProductStatus)
  status: ProductStatus;

  @Field(() => Float)
  @Min(0.01)
  @IsDecimal()
  price: number;

  @Field(() => Float)
  @Min(0.01)
  @IsDecimal()
  @IsOptional()
  minPrice?: number;

  @Field(() => Float)
  @Min(0.01)
  @IsDecimal()
  @IsOptional()
  maxPrice?: number;

  @Field(() => Float, { nullable: true })
  @IsDecimal()
  @IsOptional()
  @Min(0.01)
  salePrice?: number;

  @Field(() => [CreateAttachmentInput], { nullable: true })
  @ValidateNested({ each: true })
  @Type(() => CreateAttachmentInput)
  @IsOptional()
  attachment?: CreateAttachmentInput[];

  @Field(() => [ID])
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  @IsCategoriesExist({ message: 'Some categories do not exist' })
  categories: CreateCategoryInput[];

  @Field(() => [ID])
  @IsUUID('4', { each: true })
  @IsOptional()
  @IsTagsExist({ message: 'Some tags do not exist' })
  tags?: string[];
}
