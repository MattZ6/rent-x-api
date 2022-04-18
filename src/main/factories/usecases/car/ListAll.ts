import { ListAllCarsUseCase } from '@application/usecases/car/ListAll';

import { makePostgresCarsRepository } from '@main/factories/repositories/Car';

export function makeListAllCarsUseCase() {
  const postgresCarsRepository = makePostgresCarsRepository();

  return new ListAllCarsUseCase(postgresCarsRepository);
}
