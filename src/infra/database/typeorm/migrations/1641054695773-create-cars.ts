import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { tableNames } from '../constants';

export class createCars1641054695773 implements MigrationInterface {
  private readonly TABLE_NAME = tableNames.CARS;

  private readonly BRAND_ID_COLUMN_NAME = 'brand_id';
  private readonly CATEGORY_ID_COLUMN_NAME = 'category_id';

  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: this.TABLE_NAME,
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'license_plate',
            type: 'varchar',
          },
          {
            name: 'daily_rate',
            type: 'numeric',
          },
          {
            name: 'fine_amount',
            type: 'numeric',
          },
          {
            name: this.BRAND_ID_COLUMN_NAME,
            type: 'uuid',
          },
          {
            name: this.CATEGORY_ID_COLUMN_NAME,
            type: 'uuid',
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
        foreignKeys: [
          {
            referencedTableName: tableNames.CAR_BRANDS,
            referencedColumnNames: ['id'],
            columnNames: [this.BRAND_ID_COLUMN_NAME],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            referencedTableName: tableNames.CAR_CATEGORIES,
            referencedColumnNames: ['id'],
            columnNames: [this.CATEGORY_ID_COLUMN_NAME],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable(this.TABLE_NAME);
  }
}
