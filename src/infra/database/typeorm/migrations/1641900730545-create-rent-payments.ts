import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { tableNames } from '../constants';

export class createRentPayments1641900730545 implements MigrationInterface {
  private readonly TABLE_NAME = tableNames.RENT_PAYMENTS;

  private readonly RENT_ID_COLUMN_NAME = 'rent_id';

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
            name: this.RENT_ID_COLUMN_NAME,
            type: 'uuid',
            isUnique: true,
          },
          {
            name: 'paid_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'total',
            type: 'decimal',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'update_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            columnNames: [this.RENT_ID_COLUMN_NAME],
            referencedTableName: tableNames.RENTS,
            referencedColumnNames: ['id'],
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
