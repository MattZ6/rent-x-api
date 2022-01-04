import { ListAllCarsUseCase } from '@data/usecases/car/ListAllCars';

import { makePostgresCarsRepository } from '@main/factories/repositories/PostgresCarsRepositoryFactory';

export function makeListAllCarsUseCase() {
  const postgresCarsRepository = makePostgresCarsRepository();

  return new ListAllCarsUseCase(postgresCarsRepository);
}
