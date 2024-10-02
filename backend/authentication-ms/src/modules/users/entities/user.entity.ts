import {
  Directive,
  Field,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Exclude } from 'class-transformer';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMINISTRATOR = 'ADMINISTRATOR',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

@Entity({ name: 'users' })
@Directive('@key(fields: "id")')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ nullable: true, unique: true })
  @Field(() => String)
  email: string;

  @Column({ name: 'first_name' })
  @Field(() => String)
  firstName: string;

  @Column({ name: 'last_name' })
  @Field(() => String)
  lastName: string;

  @Column({ name: 'avatar' })
  @Field(() => String)
  avatar: string;

  @Column({ name: 'confirmation_code', nullable: true })
  @Field(() => String)
  confirmationCode: string;

  @Column({ name: 'email_verified', default: false })
  @Field(() => String)
  emailVerified: boolean;

  @CreateDateColumn({ name: 'email_verified_at', default: null })
  @Field(() => Date)
  emailVerifiedAt: Date;

  @Column({ name: 'password_reset_token', nullable: true })
  @Field(() => String)
  passwordResetToken: string;

  @CreateDateColumn({ name: 'password_reset_token_req_at', nullable: true })
  @Field(() => Date)
  passwordResetTokenReqAt: Date;

  @Column()
  @Field(() => String)
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  @Field(() => UserRole)
  role: UserRole;

  @CreateDateColumn({name: 'created_at'})
  @Field(() => String)
  createdAt: number;

  @UpdateDateColumn({name: 'updated_at'})
  @Field(() => String)
  updatedAt: number;
}
