import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, FindOptionsWhere, Like, Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { CategoriesResponse } from './responses/categories-response.dto';
import slugify from 'src/core/utils/slugify';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findAll({
    search,
    page,
    pageSize,
  }: {
    search?: string;
    page: number;
    pageSize: number;
  }): Promise<CategoriesResponse> {
    const [data, total] = await this.categoryRepository.findAndCount({
      where: search ? { title: Like(`%${search}%`) } : {},
      skip: (page - 1) * pageSize,
      take: pageSize,
      relations: ['products'],
    });

    return {
      result: {
        data,
        totalItems: total,
        totalPages: Math.ceil(total / pageSize),
        currentPage: page,
        pageSize,
      },
      message: 'Categories fetched successfully',
      statusCode: 200,
    };
  }

  async findOne(options: FindOneOptions<Category>): Promise<Category> {
    const category = await this.categoryRepository.findOne(options);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async create(createCategoryInput: CreateCategoryInput): Promise<Category> {
    return await this.categoryRepository.save({
      ...createCategoryInput,
      slug: slugify(createCategoryInput.title),
      products: [],
    });
  }

  async update(updateCategoryInput: UpdateCategoryInput): Promise<void> {
    const { id, ...updateData } = updateCategoryInput;
    const category = await this.categoryRepository.preload({
      id,
      ...updateData,
      slug: slugify(updateData.title),
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepository.save(category);
  }

  async remove(id: string): Promise<void> {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    await this.categoryRepository.remove(category);
  }

  async findBy(options: FindOptionsWhere<Category>): Promise<Category[]> {
    return await this.categoryRepository.findBy(options);
  }
}
