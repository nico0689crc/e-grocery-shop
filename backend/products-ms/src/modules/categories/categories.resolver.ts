import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

import { CategoriesResponse } from './responses/categories-response.dto';
import { Auth } from 'src/core/decorators/auth.decorator';
import { UserRole } from 'src/core/entities/user.entity';
import { CategoryResponse } from './responses/category-response.dto';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => CategoriesResponse, { name: 'categories' })
  async findAll(
    @Args('search', { type: () => String, nullable: true }) search?: string,
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 })
    page: number = 1,
    @Args('pageSize', { type: () => Int, nullable: true, defaultValue: 10 })
    pageSize: number = 10,
  ): Promise<CategoriesResponse> {
    return await this.categoriesService.findAll({
      search,
      page,
      pageSize,
    });
  }

  @Query(() => CategoryResponse, { name: 'category' })
  async findOne(@Args('id', { type: () => ID }) id: string): Promise<CategoryResponse> {
    const category = await this.categoriesService.findOne({
      where: { id },
      relations: ['products'],
    });

    return {  
      message: 'Category fetched successfully',
      statusCode: 200,
      data: category,
    };
  }

  @Mutation(() => CategoryResponse)
  @Auth(UserRole.ADMINISTRATOR)
  async createCategory(
    @Args('createCategoryInput') createCategoryInput: CreateCategoryInput,
  ): Promise<CategoryResponse> {
    const category = await this.categoriesService.create(createCategoryInput);

    return { 
      message: 'Category created successfully',
      statusCode: 201,
      data: category,
    };
  }

  @Mutation(() => CategoryResponse)
  @Auth(UserRole.ADMINISTRATOR)
  async updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ): Promise<CategoryResponse> {
    await this.categoriesService.update(updateCategoryInput);

    return {
      message: 'Category updated successfully',
      statusCode: 200,
    };
  }

  @Mutation(() => CategoryResponse)
  @Auth(UserRole.ADMINISTRATOR)
  async removeCategory(
    @Args('id', { type: () => ID }) id: string,
  ): Promise<CategoryResponse> {
    await this.categoriesService.remove(id);

    return { message: 'Category removed successfully', statusCode: 204 };
  }
}
