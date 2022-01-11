import { CreateRentController } from '@presentation/controllers/rent/CreateRent';
import { IController } from '@presentation/protocols';

import { makeCreateRentUseCase } from '@main/factories/usecases/rent/CreateRentUseCaseFactory';

export function makeCreateRentController(): IController {
  const createRentUseCase = makeCreateRentUseCase();

  return new CreateRentController(createRentUseCase);
}
