import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { Inject } from '@nestjs/common';
import { RABBITMQ_SERVICE } from 'src/core/config';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { Auth } from 'src/core/decorators/auth.decorator';
import { UserRole } from 'src/core/entities/user.entity';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  @Auth(UserRole.ADMINISTRATOR)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    try {
      return await this.productsService.create(createProductInput);
    } catch (error) {
      throw new RpcException({
        message: `Failed to create product: ${error.message}`,
        status: 500,
      });
    }
  }

  @Query(() => [Product], { name: 'products' })
  async findAll(
    @Args('tags', { type: () => [String], nullable: true }) tags?: string[],
    @Args('categories', { type: () => [String], nullable: true })
    categories?: string[],
    @Args('search', { type: () => String, nullable: true }) search?: string,
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 })
    page: number = 1,
    @Args('pageSize', { type: () => Int, nullable: true, defaultValue: 10 })
    pageSize: number = 10,
  ): Promise<Product[]> {
    return await this.productsService.findAll({
      tags,
      categories,
      search,
      page,
      pageSize,
    });
  }

  @Query(() => Product, { name: 'product' })
  async findOne(
    @Args('id', { type: () => String }) id: string,
  ): Promise<Product> {
    try {
      return await this.productsService.findOne(id);
    } catch (error) {
      throw new RpcException({
        message: `Failed to find product with ID ${id}: ${error.message}`,
        status: 404,
      });
    }
  }

  @Mutation(() => Product)
  @Auth(UserRole.ADMINISTRATOR)
  async updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    try {
      return await this.productsService.update(
        updateProductInput.id,
        updateProductInput,
      );
    } catch (error) {
      throw new RpcException({
        message: `Failed to update product with ID ${updateProductInput.id}: ${error.message}`,
        status: 500,
      });
    }
  }

  @Mutation(() => Product)
  @Auth(UserRole.ADMINISTRATOR)
  async removeProduct(
    @Args('id', { type: () => String }) id: string,
  ): Promise<void> {
    try {
      return await this.productsService.remove(id);
    } catch (error) {
      throw new RpcException({
        message: `Failed to remove product with ID ${id}: ${error.message}`,
        status: 500,
      });
    }
  }
}
