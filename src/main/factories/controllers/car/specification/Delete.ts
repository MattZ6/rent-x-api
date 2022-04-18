import { DeleteCarSpecificationController } from '@presentation/controllers/car/specification/Delete';
import { IController } from '@presentation/protocols';

import { makeDeleteCarSpecificationUseCase } from '@main/factories/usecases/car/specifications/Delete';

export function makeDeleteCarSpecificationController(): IController {
  const deleteCarSpecificationUseCase = makeDeleteCarSpecificationUseCase();

  return new DeleteCarSpecificationController(deleteCarSpecificationUseCase);
}
