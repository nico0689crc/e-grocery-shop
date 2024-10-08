import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
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
  @Field(() => Float, { nullable: true })
  minPrice: number;

  @Column({ type: 'decimal', nullable: false, name: 'max_price' })
  @Field(() => Float, { nullable: true })
  maxPrice: number;

  @Column({ type: 'decimal', name: 'sale_price', nullable: true })
  @Field(() => Float, { nullable: true })
  salePrice: number;

  @Column({ nullable: false })
  @Field(() => String)
  creator: string;

  @ManyToMany(() => Category, (category) => category.products, {
    cascade: ['insert'],
    eager: true,
  })
  @JoinTable({
    name: 'categories_products',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  @Field(() => [Category], { nullable: true })
  categories: Category[];

  @ManyToMany(() => Tag, (tag) => tag.products, {
    cascade: ['insert'],
    eager: true,
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
  @Field(() => [Tag], { nullable: true })
  tags: Tag[];

  @OneToMany(() => Attachment, (galleryItem) => galleryItem.product, {
    cascade: ['insert'],
    eager: true,
  })
  @Field(() => [Attachment], { nullable: true })
  attachments: Attachment[];
}
