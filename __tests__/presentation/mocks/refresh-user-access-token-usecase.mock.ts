import faker from 'faker';

import { IRefreshUserAccessTokenUseCase } from '@domain/usecases/user/RefreshUserAccessToken';

export class RefreshUserAccessTokenUseCaseSpy
  implements IRefreshUserAccessTokenUseCase
{
  async execute(
    _: IRefreshUserAccessTokenUseCase.Input
  ): Promise<IRefreshUserAccessTokenUseCase.Output> {
    return {
      access_token: faker.datatype.string(),
      refresh_token: faker.datatype.string(),
    };
  }
}
