import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableUsers1727833222369 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'users',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  generationStrategy: 'uuid',
                  isGenerated: true,
                },
                {
                  name: 'email',
                  type: 'varchar',
                  isNullable: true,
                  isUnique: true,
                },
                {
                  name: 'first_name',
                  type: 'varchar',
                },
                {
                  name: 'last_name',
                  type: 'varchar',
                },
                {
                  name: 'avatar',
                  type: 'varchar',
                },
                {
                  name: 'confirmation_code',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'email_verified',
                  type: 'boolean',
                  default: false,
                },
                {
                  name: 'email_verified_at',
                  type: 'timestamp',
                  isNullable: true,
                },
                {
                  name: 'password_reset_token',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'password_reset_token_req_at',
                  type: 'timestamp',
                  isNullable: true,
                },
                {
                  name: 'password',
                  type: 'varchar',
                },
                {
                  name: 'role',
                  type: 'enum',
                  enum: ['CUSTOMER', 'ADMINISTRATOR'],
                  default: `'CUSTOMER'`,
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
              ],
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
