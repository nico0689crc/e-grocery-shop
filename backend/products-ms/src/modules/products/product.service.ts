import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { FindAllOptions } from './interfaces/find-all.interface';
import { FindAllResponse } from 'src/core/dto/find-all-response.dto';
import { MessageEntityResponse } from 'src/core/dto/message-entity-response.dto';
import { CreateProductInput } from './dto/inputs/create-product.input';
import { UpdateProductInput } from './dto/inputs/update-product.input';
import { ProductsResponse } from './dto/responses/products-response.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const newProduct = this.productRepository.create({
      ...createProductInput,
      tags: createProductInput.tags?.map((tag) => ({ id: tag })),
    });
    return await this.productRepository.save(newProduct);
  }

  async findAll(options: FindAllOptions): Promise<ProductsResponse> {
    const { tags, categories, search, page, pageSize } = options;
    const query = this.productRepository.createQueryBuilder('product');

    query.leftJoinAndSelect('product.attachments', 'attachment');
    query.leftJoinAndSelect('product.tags', 'tags');
    query.leftJoinAndSelect('product.categories', 'categories');

    if (tags && tags.length > 0) {
      query
        .leftJoinAndSelect('product.tags', 'tag')
        .andWhere('tag.name IN (:...tags)', { tags });
    }

    if (categories && categories.length > 0) {
      query
        .leftJoinAndSelect('product.categories', 'category')
        .andWhere('category.name IN (:...categories)', { categories });
    }

    if (search) {
      query.andWhere(
        '(product.title ILIKE :search OR product.description ILIKE :search)',
        { search: `%${search}%` },
      );
    }

    query.skip((page - 1) * pageSize).take(pageSize);

    try {
      const [products, totalItems] = await query.getManyAndCount();
      const totalPages = Math.ceil(totalItems / pageSize);

      return {
        message: 'Products fetched successfully',
        result: {
          data: products,
          totalItems,
          totalPages,
          currentPage: page,
          pageSize,
        },
        statusCode: 200,
      };
    } catch (error) {
      throw new RpcException({
        message: `Failed to fetch products: ${error.message}`,
        status: 500,
      });
    }
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new RpcException({
        statusCode: 404,
        error: 'Not Found',
        message: `Product with ID ${id} not found`,
      });
    }
    return product;
  }

  async update(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    const product = await this.productRepository.preload({
      id: id,
      ...updateProductInput,
      tags: updateProductInput.tags?.map((tag) => ({ id: tag })),
    });
    if (!product) {
      throw new RpcException({
        statusCode: 404,
        error: 'Not Found',
        message: `Product with ID ${id} not found`,
      });
    }
    return await this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    await this.productRepository.remove(product);
  }
}
