import { ReturnRentController } from '@presentation/controllers/rent/Return';

import { makeReturnRentUseCase } from '@main/factories/usecases/rent/Return';

export function makeReturnRentController() {
  const returnRentUseCase = makeReturnRentUseCase();

  return new ReturnRentController(returnRentUseCase);
}
