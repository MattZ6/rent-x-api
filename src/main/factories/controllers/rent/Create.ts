import { CreateRentController } from '@presentation/controllers/rent/Create';
import { IController } from '@presentation/protocols';

import { makeCreateRentUseCase } from '@main/factories/usecases/rent/Create';

export function makeCreateRentController(): IController {
  const createRentUseCase = makeCreateRentUseCase();

  return new CreateRentController(createRentUseCase);
}
