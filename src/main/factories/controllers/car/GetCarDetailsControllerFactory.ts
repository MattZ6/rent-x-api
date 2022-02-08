import { GetCarDetailsController } from '@presentation/controllers/car/GetCarDetails';
import { IController } from '@presentation/protocols';

import { makeGetCarDetailsUseCase } from '@main/factories/usecases/car/GetCarDetailsUseCaseFactory';

export function makeGetCarDetailsController(): IController {
  const getCarDetailsUseCase = makeGetCarDetailsUseCase();

  return new GetCarDetailsController(getCarDetailsUseCase);
}
