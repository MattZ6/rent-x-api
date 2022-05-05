import { DeleteCarSpecificationController } from '@presentation/controllers/car/specification/Delete';
import { IController } from '@presentation/protocols';

import { makeDeleteCarSpecificationUseCase } from '@main/factories/usecases/car/specifications/Delete';
import { makeDeleteCarSpecificationControllerValidation } from '@main/factories/validators/controllers/car/specification/Delete';

export function makeDeleteCarSpecificationController(): IController {
  const validation = makeDeleteCarSpecificationControllerValidation();
  const deleteCarSpecificationUseCase = makeDeleteCarSpecificationUseCase();

  return new DeleteCarSpecificationController(
    validation,
    deleteCarSpecificationUseCase
  );
}
