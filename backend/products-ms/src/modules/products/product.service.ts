import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { FindAllOptions } from './interfaces/find-all.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductInput: CreateProductInput): Promise<Product> {
    const newProduct = this.productRepository.create({
      ...createProductInput,
      tags: createProductInput.tags?.map(tag => ({ id: tag })),
    });
    return await this.productRepository.save(newProduct);
  }

  async findAll(options: FindAllOptions): Promise<Product[]> {
    const { tags, categories, search, page, pageSize } = options;
    const query = this.productRepository.createQueryBuilder('product');

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
      return await query.getMany();
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
      tags: updateProductInput.tags?.map(tag => ({ id: tag })),
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
