import { CreateRentController } from '@presentation/controllers/rent/Create';
import { IController } from '@presentation/protocols';

import { makeCreateRentUseCase } from '@main/factories/usecases/rent/Create';
import { makeCreateRentControllerValidation } from '@main/factories/validators/controllers/rent/Create';

export function makeCreateRentController(): IController {
  const validation = makeCreateRentControllerValidation();
  const createRentUseCase = makeCreateRentUseCase();

  return new CreateRentController(validation, createRentUseCase);
}
