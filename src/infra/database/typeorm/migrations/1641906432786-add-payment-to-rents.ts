import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

import { tableNames } from '../constants';

export class addPaymentToRents1641906432786 implements MigrationInterface {
  private readonly TABLE_NAME = tableNames.RENTS;

  private readonly RENT_PAYMENT_ID_COLUMN_NAME = 'payment_id';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      this.TABLE_NAME,
      new TableColumn({
        name: this.RENT_PAYMENT_ID_COLUMN_NAME,
        type: 'uuid',
        isNullable: true,
      })
    );

    return queryRunner.createForeignKey(
      this.TABLE_NAME,
      new TableForeignKey({
        columnNames: [this.RENT_PAYMENT_ID_COLUMN_NAME],
        referencedTableName: tableNames.RENT_PAYMENTS,
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropColumn(
      this.TABLE_NAME,
      this.RENT_PAYMENT_ID_COLUMN_NAME
    );
  }
}
