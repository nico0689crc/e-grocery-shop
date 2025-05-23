import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Category } from 'src/modules/categories/entities/category.entity';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Product } from 'src/modules/products/entities/product.entity';

export default class CategoriesSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const categoryRepository = dataSource.getRepository(Category);

    const categoriesCount = await categoryRepository.count();

    if (categoriesCount === 0) {
      const filePath = path.join(__dirname, '..', '..', 'data', 'data.json');
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { categories } = JSON.parse(fileContent);

      const categoriesToSave = categoryRepository.create(
        categories.map(
          ({
            id: referenceId,
            name: title,
            slug,
            parent_id: parentId,
            created_at: createdAt,
            updated_at: updatedAt,
            deleted_at: deletedAt,
          }) => ({
            id: uuidv4(),
            referenceId,
            title,
            slug,
            parentId,
            createdAt,
            updatedAt,
            deletedAt,
          }),
        ),
      );

      await categoryRepository.save(
        categoriesToSave.map((category) => ({
          ...category,
          parentId:
            categoriesToSave.find(
              ({ referenceId }) => referenceId === +category.parentId,
            )?.id ?? null,
        })),
      );

      console.log('Categories seeded successfully.');
    } else {
      console.log(
        `Skipped seeding. ${categoriesCount} Categories already exist.`,
      );
    }
  }
}
