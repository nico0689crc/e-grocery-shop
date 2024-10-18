import { InputType, Field } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator";

@InputType()
export class CreateTagInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  name: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  slug: string;
}