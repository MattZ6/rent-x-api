import { PostgresCarSpecificationsRepository } from 'infra/database/typeorm/repositories/postgres/PostgresCarSpecificationsRepository';

let postgresCarSpecificationsRepository: PostgresCarSpecificationsRepository;

export function makePostgresCarSpecificationsRepository() {
  if (!postgresCarSpecificationsRepository) {
    postgresCarSpecificationsRepository =
      new PostgresCarSpecificationsRepository();
  }

  return postgresCarSpecificationsRepository;
}
