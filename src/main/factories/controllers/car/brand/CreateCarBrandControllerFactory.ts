import { CreateCarBrandController } from '@presentation/controllers/car/brand/CreateCarBrand';
import { IController } from '@presentation/protocols';

import { makeCreateCarBrandUseCase } from '@main/factories/usecases/car/brand/CreateCarBrandUseCaseFactory';

export function makeCreateCarBrandController(): IController {
  const createCarBrandUseCase = makeCreateCarBrandUseCase();

  return new CreateCarBrandController(createCarBrandUseCase);
}
