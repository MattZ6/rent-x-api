import { PostgresUsersRepository } from '@infra/database/typeorm/repositories/postgres/PostgresUsersRepository';

let postgresUsersRepository: PostgresUsersRepository;

export function makePostgresUsersRepository() {
  if (!postgresUsersRepository) {
    postgresUsersRepository = new PostgresUsersRepository();
  }

  return postgresUsersRepository;
}
