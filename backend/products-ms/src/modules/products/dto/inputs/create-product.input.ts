import { InputType, Field, Float, ID } from '@nestjs/graphql';
import {
  IsString,
  IsInt,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Min,
  ArrayNotEmpty,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ProductStatus } from '../../entities/product.entity';
import { GraphQLUpload, FileUpload } from 'graphql-upload-ts';
import { IsProductTitleUnique } from '../../validators/is-product-title-unique';
import { IsCategoryIdValid } from '../../validators/is-category-id-valid';
import { IsTagIdValid } from '../../validators/is-tag-id-valid';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  @IsProductTitleUnique({
    message: 'Title already exists. Choose another title.',
  })
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
  price: number;

  @Field(() => Float)
  @Min(0.01)
  @IsOptional()
  minPrice?: number;

  @Field(() => Float)
  @Min(0.01)
  @IsOptional()
  maxPrice?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @Min(0.01)
  salePrice?: number;

  @Field(() => [GraphQLUpload], { nullable: true })
  @ValidateNested({ each: true })
  @Type(() => Object)
  @IsOptional()
  attachments?: Promise<FileUpload[]>;

  @Field(() => [ID])
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  @IsCategoryIdValid({ message: 'One or more category IDs are invalid.' })
  categories: string[];

  @Field(() => [ID], { nullable: true })
  @IsUUID('4', { each: true })
  @IsOptional()
  @IsTagIdValid({ message: 'One or more tag IDs are invalid.' })
  tags?: string[];
}
