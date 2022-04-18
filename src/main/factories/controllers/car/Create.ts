import { CreateCarController } from '@presentation/controllers/car/Create';
import { IController } from '@presentation/protocols';

import { makeCreateCarUseCase } from '@main/factories/usecases/car/Create';

export function makeCreateCarController(): IController {
  const createCarUseCase = makeCreateCarUseCase();

  return new CreateCarController(createCarUseCase);
}
