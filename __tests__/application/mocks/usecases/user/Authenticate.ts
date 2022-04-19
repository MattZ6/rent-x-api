import { faker } from '@faker-js/faker';

import { IAuthenticateUserUseCase } from '@domain/usecases/user/Authenticate';

export const authenticateUserRefreshTokenExpiresTimeInMillissecondsMock =
  faker.datatype.number({
    min: 360_000_000,
    max: 360_000_000_000,
  });

export function makeAuthenticateUserUseCaseRefreshTokenExpiresInMillisseconds() {
  return faker.datatype.number({ min: 1 });
}

export function makeAuthenticateUserUseCaseInputMock(): IAuthenticateUserUseCase.Input {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
