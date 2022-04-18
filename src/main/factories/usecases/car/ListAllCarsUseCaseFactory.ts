import { ListAllCarsUseCase } from '@application/usecases/car/ListAll';

import { makePostgresCarsRepository } from '@main/factories/repositories/PostgresCarsRepositoryFactory';

export function makeListAllCarsUseCase() {
  const postgresCarsRepository = makePostgresCarsRepository();

  return new ListAllCarsUseCase(postgresCarsRepository);
}
