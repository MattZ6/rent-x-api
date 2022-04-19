import { faker } from '@faker-js/faker';

import { IResetUserPasswordUseCase } from '@domain/usecases/user/ResetPassword';

export function makeResetUserPasswordUseCaseInputMock(): IResetUserPasswordUseCase.Input {
  return {
    token: faker.datatype.string(),
    new_password: faker.internet.password(),
  };
}
