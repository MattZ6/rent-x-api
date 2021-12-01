import { Connection, getConnection, QueryRunner } from 'typeorm';

import { IDatabaseTransactionsProvider } from '../IDatabaseTransactionsProvider';

export class DatabaseTransactionsProvider
  implements IDatabaseTransactionsProvider
{
  private connection: Connection;
  private queryRunner: QueryRunner;

  constructor() {
    this.connection = getConnection();
    this.queryRunner = this.connection.createQueryRunner();
  }

  async begin(): Promise<void> {
    // await this.queryRunner.connect();

    return this.queryRunner.startTransaction();
  }

  async commit(): Promise<void> {
    return this.queryRunner.commitTransaction();
  }

  async rollback(): Promise<void> {
    return this.queryRunner.rollbackTransaction();
  }

  async dispose(): Promise<void> {
    return this.queryRunner.release();
  }
}
