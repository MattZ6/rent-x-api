import { GetCarDetailsUseCase } from '@application/usecases/car/GetDetails';

import { makePostgresCarsRepository } from '@main/factories/repositories/Car';

export function makeGetCarDetailsUseCase() {
  const postgresCarsRepository = makePostgresCarsRepository();

  return new GetCarDetailsUseCase(postgresCarsRepository);
}
