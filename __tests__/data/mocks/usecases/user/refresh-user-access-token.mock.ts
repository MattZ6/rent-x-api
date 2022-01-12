import faker from 'faker';

import { IRefreshUserAccessTokenUseCase } from '@domain/usecases/user/RefreshUserAccessToken';

export const refreshTokenExpiresTimeInMillissecondsMock = faker.datatype.number(
  {
    min: 360_000_000,
    max: 360_000_000_000,
  }
);

export const refreshUserAccessTokenUseCaseInputMock: IRefreshUserAccessTokenUseCase.Input =
  {
    refresh_token: faker.datatype.string(),
  };
