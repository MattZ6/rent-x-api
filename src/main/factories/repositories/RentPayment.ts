import { PostgresRentPaymentsRepository } from '@infra/database/typeorm/repositories/postgres/PostgresRentPaymentsRepository';

let postgresRentPaymentsRepository: PostgresRentPaymentsRepository;

export function makePostgresRentPaymentsRepository() {
  if (!postgresRentPaymentsRepository) {
    postgresRentPaymentsRepository = new PostgresRentPaymentsRepository();
  }

  return postgresRentPaymentsRepository;
}
