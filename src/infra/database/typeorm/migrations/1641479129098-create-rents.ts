import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { tableNames } from '../constants';

export class createRents1641479129098 implements MigrationInterface {
  private readonly TABLE_NAME = tableNames.RENTS;

  private readonly CAR_ID_COLUMN_NAME = 'car_id';
  private readonly USER_ID_COLUMN_NAME = 'user_id';

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
            name: this.CAR_ID_COLUMN_NAME,
            type: 'uuid',
          },
          {
            name: this.USER_ID_COLUMN_NAME,
            type: 'uuid',
          },

          {
            name: 'start_date',
            type: 'timestamp',
          },
          {
            name: 'expected_return_date',
            type: 'timestamp',
          },
          {
            name: 'return_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'daily_late_fee',
            type: 'decimal',
          },
          {
            name: 'daily_rate',
            type: 'decimal',
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
            columnNames: [this.CAR_ID_COLUMN_NAME],
            referencedColumnNames: ['id'],
            referencedTableName: tableNames.CARS,
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            columnNames: [this.USER_ID_COLUMN_NAME],
            referencedColumnNames: ['id'],
            referencedTableName: tableNames.USERS,
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
