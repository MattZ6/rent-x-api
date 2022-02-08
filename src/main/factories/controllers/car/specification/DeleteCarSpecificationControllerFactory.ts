import { DeleteCarSpecificationController } from '@presentation/controllers/car/specification/DeleteCarSpecification';
import { IController } from '@presentation/protocols';

import { makeDeleteCarSpecificationUseCase } from '@main/factories/usecases/car/specifications/DeleteCarSpecificationUseCaseFactory';

export function makeDeleteCarSpecificationController(): IController {
  const deleteCarSpecificationUseCase = makeDeleteCarSpecificationUseCase();

  return new DeleteCarSpecificationController(deleteCarSpecificationUseCase);
}
