import { RefreshUserAccessTokenController } from '@presentation/controllers/user/RefreshAccessToken';
import { IController } from '@presentation/protocols';

import { makeRefreshUserAccessTokenUseCase } from '@main/factories/usecases/user/RefreshAccessToken';

export function makeRefreshUserAccessTokenController(): IController {
  const refreshUserAccessTokenUseCase = makeRefreshUserAccessTokenUseCase();

  return new RefreshUserAccessTokenController(refreshUserAccessTokenUseCase);
}
