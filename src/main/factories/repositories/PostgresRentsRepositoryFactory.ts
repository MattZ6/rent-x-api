import { PostgresRentsRepository } from '@infra/database/typeorm/repositories/postgres/PostgresRentsRepository';

let postgresRentsRepository: PostgresRentsRepository;

export function makePostgresRentsRepository() {
  if (!postgresRentsRepository) {
    postgresRentsRepository = new PostgresRentsRepository();
  }

  return postgresRentsRepository;
}
