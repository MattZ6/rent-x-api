import { GetUserProfileController } from '@presentation/controllers/user/GetProfile';
import { IController } from '@presentation/protocols';

import { makeGetUserProfileUseCase } from '@main/factories/usecases/user/GetProfile';

export function makeGetUserProfileController(): IController {
  const getUserProfileUseCase = makeGetUserProfileUseCase();

  return new GetUserProfileController(getUserProfileUseCase);
}
