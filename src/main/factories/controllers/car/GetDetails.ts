import { GetCarDetailsController } from '@presentation/controllers/car/GetDetails';
import { IController } from '@presentation/protocols';

import { makeGetCarDetailsUseCase } from '@main/factories/usecases/car/GetDetails';

export function makeGetCarDetailsController(): IController {
  const getCarDetailsUseCase = makeGetCarDetailsUseCase();

  return new GetCarDetailsController(getCarDetailsUseCase);
}
