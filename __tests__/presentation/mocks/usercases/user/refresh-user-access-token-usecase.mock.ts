import faker from 'faker';

import { IRefreshUserAccessTokenUseCase } from '@domain/usecases/user/RefreshUserAccessToken';

export const refreshUserAccessTokenUseCaseOutputMock: IRefreshUserAccessTokenUseCase.Output =
  {
    access_token: faker.datatype.string(),
    refresh_token: faker.datatype.string(),
  };
export class RefreshUserAccessTokenUseCaseSpy
  implements IRefreshUserAccessTokenUseCase
{
  async execute(
    _: IRefreshUserAccessTokenUseCase.Input
  ): Promise<IRefreshUserAccessTokenUseCase.Output> {
    return refreshUserAccessTokenUseCaseOutputMock;
  }
}
