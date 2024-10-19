import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductsService } from './product.service';
import { Product } from './entities/product.entity';
import { RpcException } from '@nestjs/microservices';
import { Auth } from 'src/core/decorators/auth.decorator';
import { UserRole } from 'src/core/entities/user.entity';
import { ProductsResponse } from './dto/responses/products-response.dto';
import { CreateProductInput } from './dto/inputs/create-product.input';
import { UpdateProductInput } from './dto/inputs/update-product.input';
import { FindAllProductsInput } from './dto/inputs/find-all-products.input';

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

  @Query(() => ProductsResponse, { name: 'products' })
  async findAll(
    @Args('input', { nullable: true }) input?: FindAllProductsInput,
  ): Promise<ProductsResponse> {
    const { tags, categories, search, page = 1, pageSize = 10 } = input || {};
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
