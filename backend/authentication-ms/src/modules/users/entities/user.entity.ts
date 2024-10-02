import { Directive, Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Exclude } from 'class-transformer';

import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  ADMINISTRATOR = 'ADMINISTRATOR',
}

registerEnumType(UserRole, {
  name: 'UserRole',
});

@Entity({name: 'users'})
@Directive('@key(fields: "id")')
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  @Exclude()
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
  @Exclude()
  confirmationCode: string;

  @Column({ name: 'email_verified', default: false })
  @Field(() => String)
  @Exclude()
  emailVerified: boolean;

  @CreateDateColumn({ name: 'email_verified_at', default: null })
  @Field(() => Date)
  @Exclude()
  emailVerifiedAt: Date;

  @Column({ name: 'password_reset_token', nullable: true })
  @Field(() => String)
  @Exclude()
  passwordResetToken: string;

  @CreateDateColumn({ name: 'password_reset_token_req_at', nullable: true })
  @Field(() => Date)
  @Exclude()
  passwordResetTokenReqAt: Date;

  @Column()
  @Field(() => String)
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  @Field(() => String)
  passwordConfirmation: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.CUSTOMER,
  })
  @Field(() => UserRole)
  role: UserRole;

  @CreateDateColumn()
  @Field(() => String)
  @Exclude()
  createdAt: number;

  @UpdateDateColumn()
  @Field(() => String)
  @Exclude()
  updatedAt: number;
}
