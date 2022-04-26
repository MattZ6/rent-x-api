import { UpdateCarSpecificationController } from '@presentation/controllers/car/specification/Update';
import { IController } from '@presentation/protocols';

import { makeUpdateCarSpecificationUseCase } from '@main/factories/usecases/car/specifications/Update';
import { makeUpdateCarSpecificationControllerValidation } from '@main/factories/validators/controllers/car/specification/Update';

export function makeUpdateCarSpecificationController(): IController {
  const validation = makeUpdateCarSpecificationControllerValidation();
  const updateCarSpecificationUseCase = makeUpdateCarSpecificationUseCase();

  return new UpdateCarSpecificationController(
    validation,
    updateCarSpecificationUseCase
  );
}
