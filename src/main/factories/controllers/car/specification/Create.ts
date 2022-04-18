import { CreateCarSpecificationController } from '@presentation/controllers/car/specification/Create';
import { IController } from '@presentation/protocols';

import { makeCreateCarSpecificationUseCase } from '@main/factories/usecases/car/specifications/Create';

export function makeCreateCarSpecificationController(): IController {
  const createCarSpecificationUseCase = makeCreateCarSpecificationUseCase();

  return new CreateCarSpecificationController(createCarSpecificationUseCase);
}
