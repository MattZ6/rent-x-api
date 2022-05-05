import { GetCarDetailsUseCase } from '@application/usecases/car/GetDetails';

import { makeCarsRepository } from '@main/factories/repositories/Car';

export function makeGetCarDetailsUseCase() {
  const carsRepository = makeCarsRepository();

  return new GetCarDetailsUseCase(carsRepository);
}
