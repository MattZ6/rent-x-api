import faker from 'faker';

import { IAuthenticateUserUseCase } from '@domain/usecases/user/AuthenticateUser';

export const authenticateUserRefreshTokenExpiresTimeInMillissecondsMock =
  faker.datatype.number({
    min: 360_000_000,
    max: 360_000_000_000,
  });

export const authenticateUserUseCaseInputMock: IAuthenticateUserUseCase.Input =
  {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
