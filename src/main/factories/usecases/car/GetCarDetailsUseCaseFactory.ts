import { GetCarDetailsUseCase } from '@data/usecases/car/GetCarDetails';

import { makePostgresCarsRepository } from '@main/factories/repositories/PostgresCarsRepositoryFactory';

export function makeGetCarDetailsUseCase() {
  const postgresCarsRepository = makePostgresCarsRepository();

  return new GetCarDetailsUseCase(postgresCarsRepository);
}
