import { InputType, Field, Int } from '@nestjs/graphql';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsUrl } from 'class-validator';
import { AttachmentType } from '../entities/attachment.entity';

@InputType()
export class CreateAttachmentInput {
  @Field(() => String)
  @IsUrl()
  @IsNotEmpty()
  thumbnail: string;

  @Field(() => String)
  @IsUrl()
  @IsNotEmpty()
  original: string;

  @Field(() => Boolean)
  @IsBoolean()
  @IsNotEmpty()
  isPrimary: boolean;

  @Field(() => Int)
  @IsInt()
  @IsNotEmpty()
  order: number;

  @Field(() => AttachmentType)
  @IsEnum(AttachmentType)
  @IsNotEmpty()
  type: AttachmentType;
}