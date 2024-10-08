import { ObjectType, Field } from '@nestjs/graphql';
import { Core } from 'src/core/entities/core.entity';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity({ name: 'tags' })
@ObjectType()
export class Tag extends Core {
  @Column({ type: 'varchar', length: 255, nullable: false })
  @Field(() => String)
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Field(() => String)
  slug: string;

  @ManyToMany(() => Product, (product) => product.tags, {
    onDelete: 'CASCADE',
  })
  @Field(() => [Product])
  products: Product[];
}
