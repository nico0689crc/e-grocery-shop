import { ConfigModule } from '@nestjs/config';
import InitSeeder from 'database/seeds/init.seeder';
import { Category } from 'src/modules/categories/entities/category.entity';
import { DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { DataSourceOptions } from 'typeorm/data-source';

ConfigModule.forRoot({
  envFilePath: '.env',
});

const options = {
  type: 'postgres',
  host: process.env.PRODUCTS_MS_BACKEND_POSTGRES_HOST || 'localhost',
  port: 5432,
  username: process.env.PRODUCTS_MS_BACKEND_POSTGRES_USER || 'your_username',
  password:
    process.env.PRODUCTS_MS_BACKEND_POSTGRES_PASSWORD || 'your_password',
  database: process.env.PRODUCTS_MS_BACKEND_POSTGRES_DB || 'your_database',
  entities: [__dirname + '/../../src/**/*.entity.ts'],
  migrations: [__dirname + '/../migrations/**/*.ts'],
  seeds: [InitSeeder],
};

export const source = new DataSource(
  options as DataSourceOptions & SeederOptions,
);
// npm run mig-cre --name=create-table-products
