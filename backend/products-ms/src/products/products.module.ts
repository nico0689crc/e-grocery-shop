import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { Attachment } from 'src/attachments/entities/attachment.entity';
import { RabbitMQModule } from 'src/transports/rabbitmq.transport';

@Module({
  providers: [ProductsResolver, ProductsService],
  imports: [
    RabbitMQModule,
    TypeOrmModule.forFeature([Product, Category, Tag, Attachment]),
  ],
})
export class ProductsModule {}
