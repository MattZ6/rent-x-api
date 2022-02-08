import { GetUserProfileController } from '@presentation/controllers/user/GetUserProfile';
import { IController } from '@presentation/protocols';

import { makeGetUserProfileUseCase } from '@main/factories/usecases/user/GetUserProfileUseCaseFactory';

export function makeGetUserProfileController(): IController {
  const getUserProfileUseCase = makeGetUserProfileUseCase();

  return new GetUserProfileController(getUserProfileUseCase);
}
