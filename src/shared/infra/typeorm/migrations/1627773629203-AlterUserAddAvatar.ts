import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterUserAddAvatar1627773629203 implements MigrationInterface {
  private tableName = 'users';
  private columnName = 'avatar_file_name';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      this.tableName,
      new TableColumn({
        name: this.columnName,
        type: 'varchar',
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.tableName, this.columnName);
  }
}
