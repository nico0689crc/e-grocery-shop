import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoriesResolver } from './categories.resolver';
import { NatsModule } from 'src/core/transports/nats.transport';
import { IsCategoryTitleUniqueConstraint } from './validators/is-category-title-unique';

@Module({
  imports: [NatsModule, TypeOrmModule.forFeature([Category])],
  providers: [CategoriesResolver, CategoriesService, IsCategoryTitleUniqueConstraint],
  exports: [CategoriesService],
})
export class CategoriesModule {}
