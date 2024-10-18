import { Module } from '@nestjs/common';
import { ProductsService } from './product.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/modules/categories/entities/category.entity';
import { Tag } from 'src/modules/tags/entities/tag.entity';
import { Attachment } from 'src/modules/attachments/entities/attachment.entity';
import { RabbitMQModule } from 'src/core/transports/rabbitmq.transport';

@Module({
  providers: [ProductsResolver, ProductsService],
  imports: [
    RabbitMQModule,
    TypeOrmModule.forFeature([Product, Category, Tag, Attachment]),
  ],
})
export class ProductsModule {}
