import { faker } from '@faker-js/faker';

import { IRefreshUserAccessTokenUseCase } from '@domain/usecases/user/RefreshAccessToken';

export function makeRefreshUserAccessTokenUseCaseRefreshTokenExpiresInMillisseconds() {
  return faker.datatype.number({ min: 1 });
}

export function makeRefreshUserAccessTokenUseCaseInputMock(): IRefreshUserAccessTokenUseCase.Input {
  return {
    refresh_token: faker.datatype.string(),
  };
}
