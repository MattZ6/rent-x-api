import { IRefreshUserAccessTokenUseCase } from '@domain/usecases/user/RefreshAccessToken';

import { makeAuthenticationMock } from '../../../../domain';

export function makeRefreshUserAccessTokenUseCaseOutputMock(): IRefreshUserAccessTokenUseCase.Output {
  return makeAuthenticationMock();
}

export class RefreshUserAccessTokenUseCaseSpy
  implements IRefreshUserAccessTokenUseCase
{
  async execute(
    _: IRefreshUserAccessTokenUseCase.Input
  ): Promise<IRefreshUserAccessTokenUseCase.Output> {
    return makeRefreshUserAccessTokenUseCaseOutputMock();
  }
}
