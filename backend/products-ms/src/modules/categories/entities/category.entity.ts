import { ObjectType, Field } from '@nestjs/graphql';
import { Core } from 'src/core/entities/core.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity({ name: 'categories' })
@ObjectType()
export class Category extends Core {
  @Column({ type: 'varchar', length: 255, nullable: false })
  @Field()
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  @Field(() => String)
  slug: string;

  @Column({ type: 'text', nullable: false })
  @Field(() => String, { nullable: true })
  description: string;

  @Column({ type: 'varchar', name: 'parent_id', nullable: true })
  @Field(() => String, { nullable: true })
  parentId: string;

  @Column({ type: 'int', name: 'reference_id', nullable: true })
  referenceId: number;

  @ManyToMany(() => Product, (product) => product.categories)
  @Field(() => [Product])
  products: Product[];
}
