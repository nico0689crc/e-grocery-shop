import { ObjectType, Directive, Field, ID } from "@nestjs/graphql";
import { Product } from "src/modules/products/entities/product.entity";

export enum UserRole {
    CUSTOMER = 'CUSTOMER',
    ADMINISTRATOR = 'ADMINISTRATOR',
}  

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  @Directive('@external')
  id: string;

  @Field(() => [Product])
  products?: Product[];
}