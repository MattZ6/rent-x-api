import { CreateCarController } from '@presentation/controllers/car/CreateCar';
import { IController } from '@presentation/protocols';

import { makeCreateCarUseCase } from '@main/factories/usecases/car/CreateCarUseCaseFactory';

export function makeCreateCarController(): IController {
  const createCarUseCase = makeCreateCarUseCase();

  return new CreateCarController(createCarUseCase);
}
