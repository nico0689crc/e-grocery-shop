import {
  Entity,
  Column,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Field, Float, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Attachment } from 'src/attachments/entities/attachment.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Core } from 'src/core/entities/core.entity';
import { Tag } from 'src/tags/entities/tag.entity';

enum ProductStatus {
  PUBLISHED = 'PUBLISHED',
  DRAFTED = 'DRAFTED',
}

registerEnumType(ProductStatus, { name: 'ProductStatus' });

@Entity({ name: 'products' })
@ObjectType()
export class Product extends Core {
  @Column({ type: 'varchar', length: 255, nullable: false })
  @Field(() => String)
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  @Field(() => String)
  slug: string;

  @Column({ type: 'text', nullable: false })
  @Field(() => String)
  description: string;

  @Column({ default: true, name: 'in_stock', type: 'boolean' })
  @Field(() => Boolean)
  inStock: boolean;

  @Column({ type: 'int', nullable: false, default: 0 })
  @Field(() => Number)
  stock: number;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.PUBLISHED,
  })
  @Field(() => ProductStatus)
  status: ProductStatus;

  @Column({ type: 'decimal', nullable: false })
  @Field(() => Float)
  price: number;

  @Column({ type: 'decimal', nullable: false, name: 'min_price' })
  @Field(() => Float)
  minPrice: number;

  @Column({ type: 'decimal', nullable: false, name: 'max_price' })
  @Field(() => Float)
  maxPrice: number;

  @Column({ type: 'decimal', name: 'sale_price' })
  @Field(() => Float)
  salePrice: number;

  @Column({ nullable: false })
  @Field(() => String)
  creator: string;

  @ManyToMany(() => Category, (category) => category.products, {
    cascade: ['insert'],
  })
  @JoinTable({
    name: 'product_categories',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  @Field(() => [Category])
  categories: Category[];

  @ManyToMany(() => Tag, (tag) => tag.products, {
    cascade: ['insert'],
  })
  @JoinTable({
    name: 'tags_products',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tag_id',
      referencedColumnName: 'id',
    },
  })
  @Field(() => [Tag])
  tags: Tag[];

  @OneToMany(() => Attachment, (galleryItem) => galleryItem.product, {
    cascade: ['insert'],
  })
  @JoinColumn({ name: 'product_id' })
  @Field(() => [Attachment])
  attachments: Attachment[];
}
