import { ListAllUserRentalsController } from '@presentation/controllers/rent/user/ListAll';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeListAllUserRentalsUseCase } from '@main/factories/usecases/rent/user/ListAll';
import { makeListAllUserRentalsControllerValidation } from '@main/factories/validators/controllers/rent/user/ListAll';

export function makeListAllUserRentalsController(): IController {
  const validation = makeListAllUserRentalsControllerValidation();
  const listAllUserRentsUseCase = makeListAllUserRentalsUseCase();

  const controller = new ListAllUserRentalsController(
    validation,
    listAllUserRentsUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
