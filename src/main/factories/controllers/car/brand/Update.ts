import { UpdateCarBrandController } from '@presentation/controllers/car/brand/Update';
import { IController } from '@presentation/protocols';

import { makeUpdateCarBrandUseCase } from '@main/factories/usecases/car/brand/Update';
import { makeUpdateCarBrandControllerValidation } from '@main/factories/validators/controllers/car/brand/Update';

export function makeUpdateCarBrandController(): IController {
  const validation = makeUpdateCarBrandControllerValidation();
  const updateCarBrandUseCase = makeUpdateCarBrandUseCase();

  return new UpdateCarBrandController(validation, updateCarBrandUseCase);
}
