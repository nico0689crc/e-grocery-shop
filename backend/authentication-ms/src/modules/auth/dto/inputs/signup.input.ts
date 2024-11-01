import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches
} from 'class-validator';
import { PasswordMatch } from 'src/core/decorators/password-match';

@InputType()
export class SignUpInput {
  @IsEmail()
  @IsNotEmpty()
  @Field(() => String)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @Matches(
    /^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,100}$/,
    {
      message:
        'Your password must contain at least two uppercase letters, one special character, two digits, three lowercase letters, and be of minimum length 8.',
    },
  )
  @Field(() => String)
  password: string;

  @PasswordMatch('password')
  @Field(() => String)
  passwordConfirmation: string;

  @IsString()
  @IsNotEmpty()
  @Field(() => String)
  returnUrl: string;
}
