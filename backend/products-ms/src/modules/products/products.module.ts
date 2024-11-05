import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { Attachment } from 'src/modules/attachments/entities/attachment.entity';
import { NatsModule } from 'src/core/transports/nats.transport';
import { CategoriesModule } from '../categories/categories.module';
import { IsTitleUniqueConstraint } from './validators/is-product-title-unique';
import { IsCategoryIdValidConstraint } from './validators/is-category-id-valid';
import { IsTagIdValidConstraint } from './validators/is-tag-id-valid';
import { TagsModule } from '../tags/tags.module';

@Module({
  providers: [
    ProductsResolver,
    ProductsService,
    IsTitleUniqueConstraint,
    IsCategoryIdValidConstraint,
    IsTagIdValidConstraint,
  ],
  imports: [
    NatsModule,
    CategoriesModule,
    TagsModule,
    TypeOrmModule.forFeature([Product, Category, Tag, Attachment]),
  ],
  exports: [ProductsService],
})
export class ProductsModule {}
