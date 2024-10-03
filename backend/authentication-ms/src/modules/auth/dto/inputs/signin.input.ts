import { InputType, Field, Float } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

@InputType()
export class SignInInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  password: string;
}
