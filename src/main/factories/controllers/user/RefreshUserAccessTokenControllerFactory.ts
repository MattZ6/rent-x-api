import { RefreshUserAccessTokenController } from '@presentation/controllers/user/RefreshUserAccessToken';
import { IController } from '@presentation/protocols';

import { makeRefreshUserAccessTokenUseCase } from '@main/factories/usecases/user/RefreshUserAccessTokenUseCaseFactory';

export function makeRefreshUserAccessTokenController(): IController {
  const refreshUserAccessTokenUseCase = makeRefreshUserAccessTokenUseCase();

  return new RefreshUserAccessTokenController(refreshUserAccessTokenUseCase);
}
