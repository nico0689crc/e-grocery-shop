import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Core } from 'src/core/entities/core.entity';
import { Product } from 'src/modules/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

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
