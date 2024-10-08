import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Category } from 'src/categories/entities/category.entity';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Product } from 'src/products/entities/product.entity';
import { AttachmentType } from 'src/attachments/entities/attachment.entity';

export default class ProductsSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const categoryRepository = dataSource.getRepository(Category);
    const productRepository = dataSource.getRepository(Product);

    const productsCount = await productRepository.count();

    if (productsCount === 0) {
      const categoriesResult = await categoryRepository.find();

      const filePath = path.join(__dirname, '..', '..', 'data', 'data.json');
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { products } = JSON.parse(fileContent);

      await productRepository.save(
        products.map(
          ({
            name: title,
            slug,
            description,
            price,
            stock,
            salePrice,
            minPrice,
            maxPrice,
            inStock,
            catagories,
            attachements,
            status,
            created_at: createdAt,
            updated_at: updatedAt,
            deleted_at: deletedAt,
          }) => ({
            id: uuidv4(),
            title,
            slug,
            description,
            price,
            stock,
            salePrice,
            minPrice,
            maxPrice,
            inStock,
            status,
            creator: 'a1fa8681-72af-4363-869a-930e123794a7',
            categories: catagories.map((categoryId: number) => ({
              id: categoriesResult.find(
                ({ referenceId }) => referenceId === categoryId,
              )?.id,
            })),
            attachments: [
              ...attachements.images.map(({thumbnail, original, isPrimary, order}) => ({
                thumbnail,
                original,
                isPrimary,
                order,
                type: AttachmentType.IMAGE,
              })),
              ...attachements.videos.map(({thumbnail, original, isPrimary, order}) => ({
                thumbnail,
                original,
                isPrimary,
                order,
                type: AttachmentType.VIDEO,
              }))
            ],
            createdAt,
            updatedAt,
            deletedAt,
          }),
        ),
      );

      console.log('Products seeded successfully.');
    } else {
      console.log(`Skipped seeding. ${productsCount} Products already exist.`);
    }
  }
}
