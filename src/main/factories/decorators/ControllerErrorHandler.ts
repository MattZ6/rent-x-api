import { IController } from '@presentation/protocols';

import { ControllerErrorHandlerDecorator } from '@main/decorators/ControllerErrorHandler';
import { makeErrorsRepository } from '@main/factories/repositories/Error';

export function makeControllerErrorHandlerDecorator(controller: IController) {
  const errorsRepository = makeErrorsRepository();

  return new ControllerErrorHandlerDecorator(controller, errorsRepository);
}
