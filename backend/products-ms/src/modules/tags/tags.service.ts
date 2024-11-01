import { Injectable, NotFoundException } from '@nestjs/common';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import slugify from 'src/core/utils/slugify';
import { CreateTagInput } from './dto/inputs/create-tag.input';
import { UpdateTagInput } from './dto/inputs/update-tag.input';
import { FindAllOptions } from '../products/interfaces/find-all.interface';
import { TagsResponse } from './responses/tags-response.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createTagInput: CreateTagInput): Promise<Tag> {
    const newTag = this.tagRepository.create({
      ...createTagInput,
      slug: slugify(createTagInput.name),
    });
    return this.tagRepository.save(newTag);
  }

  async findAll(options: FindAllOptions): Promise<TagsResponse> {
    const { search, page, pageSize } = options;
    const query = this.tagRepository.createQueryBuilder('tag');

    query.leftJoinAndSelect('tag.products', 'products');

    if (search) {
      query.andWhere(
        '(tag.name ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    query.skip((page - 1) * pageSize).take(pageSize);

    try {
      const [tags, totalItems] = await query.getManyAndCount();
      
      const totalPages = Math.ceil(totalItems / pageSize);

      return {
        message: 'Tags fetched successfully',
        result: {
          data: tags,
          totalItems,
          totalPages,
          currentPage: page,
          pageSize,
        },
        statusCode: 200,
      };
    } catch (error) {
      throw new RpcException({
        message: `Failed to fetch tags: ${error.message}`,
        status: 500,
      });
    }
  }

  async findOne(options: FindOneOptions<Tag>): Promise<Tag> {
    return await this.tagRepository.findOne(options);
  }


  async findBy(options: FindOptionsWhere<Tag>): Promise<Tag[]> {
    return await this.tagRepository.findBy(options);
  }

  async update(id: string, updateTagInput: UpdateTagInput): Promise<Tag> {
    const tag = await this.tagRepository.preload({
      id,
      ...updateTagInput,
      slug: slugify(updateTagInput.name),
    });

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    return this.tagRepository.save(tag);
  }

  async remove(id: string): Promise<Tag> {
    const tag = await this.tagRepository.preload({ id });

    if (!tag) {
      throw new NotFoundException(`Tag with ID ${id} not found`);
    }

    await this.tagRepository.remove(tag);
    return tag;
  }
}
