import { UpdateCarSpecificationController } from '@presentation/controllers/car/specification/UpdateCarSpecification';
import { IController } from '@presentation/protocols';

import { makeUpdateCarSpecificationUseCase } from '@main/factories/usecases/car/specifications/UpdateCarSpecificationUseCaseFactory';

export function makeUpdateCarSpecificationController(): IController {
  const updateCarSpecificationUseCase = makeUpdateCarSpecificationUseCase();

  return new UpdateCarSpecificationController(updateCarSpecificationUseCase);
}
