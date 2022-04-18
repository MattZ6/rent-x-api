import { PostgresCarCategoriesRepository } from '@infra/database/typeorm/repositories/postgres/PostgresCarCategoriesRepository';

let postgresCarCategoriesRepository: PostgresCarCategoriesRepository;

export function makePostgresCarCategoriesRepository() {
  if (!postgresCarCategoriesRepository) {
    postgresCarCategoriesRepository = new PostgresCarCategoriesRepository();
  }

  return postgresCarCategoriesRepository;
}
