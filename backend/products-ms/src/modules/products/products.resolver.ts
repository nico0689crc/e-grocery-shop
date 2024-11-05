import { Resolver, Query, Mutation, Args, Int, Context, ResolveField, Parent } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { RpcException } from '@nestjs/microservices';
import { Auth } from 'src/core/decorators/auth.decorator';
import { ProductsResponse } from './dto/responses/products-response.dto';
import { CreateProductInput } from './dto/inputs/create-product.input';
import { UpdateProductInput } from './dto/inputs/update-product.input';
import { UserRole } from '../users/entities/user.entity';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) {}

  @Mutation(() => Product)
  @Auth(UserRole.ADMINISTRATOR)
  async createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
    @Context() context: any,
  ): Promise<Product> {
    return await this.productsService.create(
      createProductInput,
      context.req.user,
    );
  }

  @Query(() => ProductsResponse, { name: 'products' })
  async findAll(
    @Args('tags', { type: () => [String], nullable: true }) tags?: string[],
    @Args('categories', { type: () => [String], nullable: true })
    categories?: string[],
    @Args('search', { type: () => String, nullable: true }) search?: string,
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 })
    page: number = 1,
    @Args('pageSize', { type: () => Int, nullable: true, defaultValue: 10 })
    pageSize: number = 10,
  ): Promise<ProductsResponse> {
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
    const product = await this.productsService.findOne({ where: { id } });

    if (!product) {
      throw new RpcException({
        message: `Product with ID ${id} not found`,
        status: 404,
      });
    }

    return product;
  }

  @Mutation(() => Product)
  @Auth(UserRole.ADMINISTRATOR)
  async updateProduct(
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return await this.productsService.update(
      updateProductInput.id,
      updateProductInput,
    );
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

  @ResolveField(() => Product)
  user(@Parent() product: Product): any {
    return { __typename: 'User', id: product.creator };
  }
}
