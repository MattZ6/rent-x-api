import { RefreshUserAccessTokenController } from '@presentation/controllers/user/RefreshAccessToken';
import { IController } from '@presentation/protocols';

import { makeRefreshUserAccessTokenUseCase } from '@main/factories/usecases/user/RefreshAccessToken';
import { makeRefreshUserAccessTokenControllerValidation } from '@main/factories/validators/controllers/user/RefreshAccessToken';

export function makeRefreshUserAccessTokenController(): IController {
  const validation = makeRefreshUserAccessTokenControllerValidation();
  const refreshUserAccessTokenUseCase = makeRefreshUserAccessTokenUseCase();

  return new RefreshUserAccessTokenController(
    validation,
    refreshUserAccessTokenUseCase
  );
}
