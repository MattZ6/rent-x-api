import { UpdateCarSpecificationController } from '@presentation/controllers/car/specification/Update';
import { IController } from '@presentation/protocols';

import { makeUpdateCarSpecificationUseCase } from '@main/factories/usecases/car/specifications/Update';

export function makeUpdateCarSpecificationController(): IController {
  const updateCarSpecificationUseCase = makeUpdateCarSpecificationUseCase();

  return new UpdateCarSpecificationController(updateCarSpecificationUseCase);
}
