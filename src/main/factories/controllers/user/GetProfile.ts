import { GetUserProfileController } from '@presentation/controllers/user/GetProfile';
import { IController } from '@presentation/protocols';

import { makeControllerErrorHandlerDecorator } from '@main/factories/decorators/ControllerErrorHandler';
import { makeGetUserProfileUseCase } from '@main/factories/usecases/user/GetProfile';

export function makeGetUserProfileController(): IController {
  const getUserProfileUseCase = makeGetUserProfileUseCase();

  const controller = new GetUserProfileController(getUserProfileUseCase);

  return makeControllerErrorHandlerDecorator(controller);
}
