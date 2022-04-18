import { UpdateCarBrandController } from '@presentation/controllers/car/brand/Update';
import { IController } from '@presentation/protocols';

import { makeUpdateCarBrandUseCase } from '@main/factories/usecases/car/brand/Update';

export function makeUpdateCarBrandController(): IController {
  const updateCarBrandUseCase = makeUpdateCarBrandUseCase();

  return new UpdateCarBrandController(updateCarBrandUseCase);
}
