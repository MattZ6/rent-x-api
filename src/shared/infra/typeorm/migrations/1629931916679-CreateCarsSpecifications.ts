import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCarsSpecifications1629931916679
  implements MigrationInterface
{
  private readonly TABLE_NAME = 'cars_specifications';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.TABLE_NAME,
        columns: [
          {
            name: 'car_id',
            type: 'uuid',
          },
          {
            name: 'specification_id',
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
            columnNames: ['car_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cars',
          },
          {
            columnNames: ['specification_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'specifications',
          },
        ],
        uniques: [
          {
            columnNames: ['car_id', 'specification_id'],
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.TABLE_NAME);
  }
}
