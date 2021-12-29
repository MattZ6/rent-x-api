import { UpdateCarBrandController } from '@presentation/controllers/car/brand/UpdateCarBrand';
import { IController } from '@presentation/protocols';

import { makeUpdateCarBrandUseCase } from '@main/factories/usecases/car/brand/UpdateCarBrandUseCaseFactory';

export function makeUpdateCarBrandController(): IController {
  const updateCarBrandUseCase = makeUpdateCarBrandUseCase();

  return new UpdateCarBrandController(updateCarBrandUseCase);
}
