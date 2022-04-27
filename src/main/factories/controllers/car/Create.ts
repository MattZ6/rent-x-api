import { CreateCarController } from '@presentation/controllers/car/Create';
import { IController } from '@presentation/protocols';

import { makeCreateCarUseCase } from '@main/factories/usecases/car/Create';
import { makeCreateCarControllerValidation } from '@main/factories/validators/controllers/car/Create';

export function makeCreateCarController(): IController {
  const validation = makeCreateCarControllerValidation();
  const createCarUseCase = makeCreateCarUseCase();

  return new CreateCarController(validation, createCarUseCase);
}
