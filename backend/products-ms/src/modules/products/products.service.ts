import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { FindAllOptions } from './interfaces/find-all.interface';
import { CreateProductInput } from './dto/inputs/create-product.input';
import { UpdateProductInput } from './dto/inputs/update-product.input';
import { ProductsResponse } from './dto/responses/products-response.dto';
import { FileUpload } from 'graphql-upload-ts';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';
import {
  Attachment,
  AttachmentType,
} from '../attachments/entities/attachment.entity';
import { CategoriesService } from '../categories/categories.service';
import slugify from 'src/core/utils/slugify';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
  ) {}

  async create(
    createProductInput: CreateProductInput,
    { id }: User,
  ): Promise<Product> {
    const attachments: Partial<Attachment>[] = [];

    if (createProductInput.attachments) {
      (await this.uploadImages(createProductInput.attachments)).forEach(
        (attachment) => attachments.push(attachment),
      );
    }

    const savedProduct = await this.productRepository.save({
      ...createProductInput,
      slug: slugify(createProductInput.title),
      creator: id,
      attachments,
      tags: createProductInput.tags?.map((tag) => ({ id: tag })),
      categories: createProductInput.categories?.map((category) => ({
        id: category,
      })),
    });

    return this.productRepository.findOne({
      where: { id: savedProduct.id },
      relations: ['attachments', 'tags', 'categories'],
    });
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
        .andWhere('tag.id IN (:...tags)', { tags });
    }

    if (categories && categories.length > 0) {
      query
        .leftJoinAndSelect('product.categories', 'category')
        .andWhere('category.id IN (:...categories)', { categories });
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

  async findOne(options: FindOneOptions<Product>): Promise<Product> {
    return await this.productRepository.findOne(options);
  }

  async update(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    const attachments: Partial<Attachment>[] = [];

    if (updateProductInput.attachments) {
      (await this.uploadImages(updateProductInput.attachments)).forEach(
        (attachment) => attachments.push(attachment),
      );
    }

    const product = await this.productRepository.preload({
      id,
      ...updateProductInput,
      slug: slugify(updateProductInput.title),
      attachments,
      tags: updateProductInput.tags?.map((tag) => ({ id: tag })),
      categories: updateProductInput.categories?.map((category) => ({
        id: category,
      })),
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

    if (!product) {
      throw new RpcException({
        statusCode: 404,
        error: 'Not Found',
        message: `Product with ID ${id} not found`,
      });
    }

    await this.productRepository.remove(product);
  }

  private async uploadImages(
    images: Promise<FileUpload[]>,
  ): Promise<Partial<Attachment>[]> {
    const attachments: Partial<Attachment>[] = [];

    const uploadDir = path.join(__dirname, '..', '..', 'uploads');

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const imagesUploads = await images;

    imagesUploads.forEach((image, index) => {
      const { createReadStream, filename } = image;
      const newFilename = `${uuidv4()}-${filename}`;
      const filePath = path.join(uploadDir, newFilename);

      const stream = createReadStream();
      const writeStream = fs.createWriteStream(filePath);
      stream.pipe(writeStream);

      attachments.push({
        thumbnail: `/uploads/${newFilename}`,
        original: `/uploads/${newFilename}`,
        isPrimary: index === 0,
        order: index + 1,
        type: AttachmentType.IMAGE,
      });
    });

    return attachments;
  }

  async findBy(options: FindOptionsWhere<Product>): Promise<Product[]> {
    return await this.productRepository.findBy(options);
  }
}
