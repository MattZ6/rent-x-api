import { PostgresCarBrandsRepository } from '@infra/database/typeorm/repositories/postgres/PostgresCarBrandsRepository';

let postgresCarBrandsRepository: PostgresCarBrandsRepository;

export function makePostgresCarBrandsRepository() {
  if (!postgresCarBrandsRepository) {
    postgresCarBrandsRepository = new PostgresCarBrandsRepository();
  }

  return postgresCarBrandsRepository;
}
