import { CreateCarBrandController } from '@presentation/controllers/car/brand/Create';
import { IController } from '@presentation/protocols';

import { makeCreateCarBrandUseCase } from '@main/factories/usecases/car/brand/Create';

export function makeCreateCarBrandController(): IController {
  const createCarBrandUseCase = makeCreateCarBrandUseCase();

  return new CreateCarBrandController(createCarBrandUseCase);
}
