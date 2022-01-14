import { ReturnRentController } from '@presentation/controllers/rent/ReturnRent';

import { makeReturnRentUseCase } from '@main/factories/usecases/rent/ReturnRentUseCaseFactory';

export function makeReturnRentController() {
  const returnRentUseCase = makeReturnRentUseCase();

  return new ReturnRentController(returnRentUseCase);
}
