import { ObjectType, Field, Int, ID, registerEnumType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Core } from 'src/core/entities/core.entity';
import { Product } from 'src/modules/products/entities/product.entity';

export enum AttachmentType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO',
  FILE = 'FILE',
  AUDIO = 'AUDIO',
}

registerEnumType(AttachmentType, { name: 'AttachmentType' });

@Entity({ name: 'attachments' })
@ObjectType()
export class Attachment extends Core {
  @Column({ type: 'varchar', length: 255, nullable: false })
  @Field(() => String)
  thumbnail: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  @Field(() => String)
  original: string;

  @Column({
    type: 'boolean',
    name: 'is_primary',
    nullable: false,
    default: false,
  })
  @Field(() => Boolean)
  isPrimary: boolean;

  @Column({ type: 'int', nullable: false })
  @Field(() => Int)
  order: number;

  @Column({ type: 'enum', enum: AttachmentType })
  @Field(() => AttachmentType)
  type: AttachmentType;

  @ManyToOne(() => Product, (product) => product.attachments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
