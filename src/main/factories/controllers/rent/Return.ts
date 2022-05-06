import { ReturnRentController } from '@presentation/controllers/rent/Return';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeReturnRentUseCase } from '@main/factories/usecases/rent/Return';
import { makeReturnRentControllerValidation } from '@main/factories/validators/controllers/rent/Return';

export function makeReturnRentController() {
  const validation = makeReturnRentControllerValidation();
  const returnRentUseCase = makeReturnRentUseCase();

  const controller = new ReturnRentController(validation, returnRentUseCase);

  return makeControllerErrorHandlerDecorator(controller);
}
