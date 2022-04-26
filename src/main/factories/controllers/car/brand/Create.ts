import { CreateCarBrandController } from '@presentation/controllers/car/brand/Create';
import { IController } from '@presentation/protocols';

import { makeCreateCarBrandUseCase } from '@main/factories/usecases/car/brand/Create';
import { makeCreateCarBrandControllerValidation } from '@main/factories/validators/controllers/car/brand/Create';

export function makeCreateCarBrandController(): IController {
  const validation = makeCreateCarBrandControllerValidation();
  const createCarBrandUseCase = makeCreateCarBrandUseCase();

  return new CreateCarBrandController(validation, createCarBrandUseCase);
}
