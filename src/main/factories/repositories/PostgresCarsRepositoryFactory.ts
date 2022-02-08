import { PostgresCarsRepository } from '@infra/database/typeorm/repositories/postgres/PostgresCarsRepository';

let postgresCarsRepository: PostgresCarsRepository;

export function makePostgresCarsRepository() {
  if (!postgresCarsRepository) {
    postgresCarsRepository = new PostgresCarsRepository();
  }

  return postgresCarsRepository;
}
