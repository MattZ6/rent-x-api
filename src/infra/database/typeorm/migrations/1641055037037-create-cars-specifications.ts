import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { tableNames } from '../constants';

export class createCarsSpecifications1641055037037
  implements MigrationInterface
{
  private readonly TABLE_NAME = tableNames.CARS_SPECIFICATIONS;

  private readonly CAR_ID_COLUMN_NAME = 'car_id';
  private readonly SPECIFICATION_ID_COLUMN_NAME = 'specification_id';

  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.createTable(
      new Table({
        name: this.TABLE_NAME,
        columns: [
          {
            name: this.CAR_ID_COLUMN_NAME,
            type: 'uuid',
          },
          {
            name: this.SPECIFICATION_ID_COLUMN_NAME,
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            columnNames: [this.CAR_ID_COLUMN_NAME],
            referencedColumnNames: ['id'],
            referencedTableName: tableNames.CARS,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: [this.SPECIFICATION_ID_COLUMN_NAME],
            referencedColumnNames: ['id'],
            referencedTableName: tableNames.CAR_SPECIFICATIONS,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
        uniques: [
          {
            columnNames: [
              this.CAR_ID_COLUMN_NAME,
              this.SPECIFICATION_ID_COLUMN_NAME,
            ],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable(this.TABLE_NAME);
  }
}
