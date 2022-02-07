import { PostgresUserAvatarsRepository } from '@infra/database/typeorm/repositories/postgres/PostgresUserAvatarsRepository';

let postgresUserAvatarsRepository: PostgresUserAvatarsRepository;

export function makePostgresUserAvatarsRepository() {
  if (!postgresUserAvatarsRepository) {
    postgresUserAvatarsRepository = new PostgresUserAvatarsRepository();
  }

  return postgresUserAvatarsRepository;
}
