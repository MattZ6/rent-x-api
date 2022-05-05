import { ReturnRentController } from '@presentation/controllers/rent/Return';

import { makeReturnRentUseCase } from '@main/factories/usecases/rent/Return';
import { makeReturnRentControllerValidation } from '@main/factories/validators/controllers/rent/Return';

export function makeReturnRentController() {
  const validation = makeReturnRentControllerValidation();
  const returnRentUseCase = makeReturnRentUseCase();

  return new ReturnRentController(validation, returnRentUseCase);
}
