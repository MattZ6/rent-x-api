import { AddImagesToCarController } from '@presentation/controllers/car/images/Add';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeAddImagesToCarUseCase } from '@main/factories/usecases/car/image/Add';
import { makeAddImagesToCarControllerValidation } from '@main/factories/validators/controllers/car/image/Add';

export function makeAddImagesToCarController(): IController {
  const validation = makeAddImagesToCarControllerValidation();
  const addImagesToCarUseCase = makeAddImagesToCarUseCase();

  const controller = new AddImagesToCarController(
    validation,
    addImagesToCarUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
