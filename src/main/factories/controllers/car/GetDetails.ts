import { GetCarDetailsController } from '@presentation/controllers/car/GetDetails';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeGetCarDetailsUseCase } from '@main/factories/usecases/car/GetDetails';
import { makeGetCarDetailsControllerValidation } from '@main/factories/validators/controllers/car/GetDetails';

export function makeGetCarDetailsController(): IController {
  const validation = makeGetCarDetailsControllerValidation();
  const getCarDetailsUseCase = makeGetCarDetailsUseCase();

  const controller = new GetCarDetailsController(
    validation,
    getCarDetailsUseCase
  );

  return makeControllerErrorHandlerDecorator(controller);
}
