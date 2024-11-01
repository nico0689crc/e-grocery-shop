import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsResolver } from './tags.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { IsTitleUniqueConstraint } from './validators/is-tag-title-unique';
import { NatsModule } from 'src/core/transports/nats.transport';

@Module({
  imports: [NatsModule, TypeOrmModule.forFeature([Tag])],
  providers: [TagsService, TagsResolver, IsTitleUniqueConstraint],
  exports: [TagsService],
})
export class TagsModule {}
