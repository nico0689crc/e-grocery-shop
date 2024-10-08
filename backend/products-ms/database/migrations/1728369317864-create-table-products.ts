import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableProducts1728369317864 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'products',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            isGenerated: true,
          },
          {
            name: 'title',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'slug',
            type: 'varchar',
            length: '255',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'in_stock',
            type: 'boolean',
            default: true,
          },
          {
            name: 'stock',
            type: 'int',
            isNullable: false,
            default: 0,
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['PUBLISHED', 'DRAFTED'],
            default: `'PUBLISHED'`,
          },
          {
            name: 'price',
            type: 'decimal',
            isNullable: false,
            default: 0,
          },
          {
            name: 'min_price',
            type: 'decimal',
            isNullable: false,
            default: 0,
          },
          {
            name: 'max_price',
            type: 'decimal',
            isNullable: false,
            default: 0,
          },
          {
            name: 'creator',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('products');
  }
}
