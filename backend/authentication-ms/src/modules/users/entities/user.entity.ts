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

  @Column({ name: 'avatar', nullable: true })
  @Field(() => String, { nullable: true })
  avatar: string;

  @Column({ name: 'confirmation_code', nullable: true })
  @Exclude()
  confirmationCode: string;

  @Column({ name: 'email_verified', default: false })
  @Exclude()
  emailVerified: boolean;

  @CreateDateColumn({ name: 'email_verified_at', default: null })
  @Exclude()
  emailVerifiedAt: Date;

  @Column({ name: 'password_reset_token', nullable: true })
  @Exclude()
  passwordResetToken: string;

  @CreateDateColumn({ name: 'password_reset_token_req_at', nullable: true })
  @Exclude()
  passwordResetTokenReqAt: Date;

  @Column()
  @Exclude()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  @Field(() => UserRole)
  role: UserRole;

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  createdAt: number;

  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude()
  updatedAt: number;
}
