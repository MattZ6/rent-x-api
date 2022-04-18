import { GetCarDetailsUseCase } from '@application/usecases/car/GetDetails';

import { makePostgresCarsRepository } from '@main/factories/repositories/PostgresCarsRepositoryFactory';

export function makeGetCarDetailsUseCase() {
  const postgresCarsRepository = makePostgresCarsRepository();

  return new GetCarDetailsUseCase(postgresCarsRepository);
}
