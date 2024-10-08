import { DataSource } from 'typeorm';
import { runSeeders, Seeder, SeederFactoryManager } from 'typeorm-extension';
import CategoriesSeeder from './categories.seeder';
import ProductsSeeder from './products.seeder';

export default class InitSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [CategoriesSeeder, ProductsSeeder],
      factories: [],
    });
  }
}
