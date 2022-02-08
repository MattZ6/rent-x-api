import { CreateCarSpecificationController } from '@presentation/controllers/car/specification/CreateCarSpecification';
import { IController } from '@presentation/protocols';

import { makeCreateCarSpecificationUseCase } from '@main/factories/usecases/car/specifications/CreateCarSpecificationUseCaseFactory';

export function makeCreateCarSpecificationController(): IController {
  const createCarSpecificationUseCase = makeCreateCarSpecificationUseCase();

  return new CreateCarSpecificationController(createCarSpecificationUseCase);
}
