import faker from 'faker';

import { IResetUserPasswordUseCase } from '@domain/usecases/user/ResetUserPassword';

export const resetUserPasswordUseCaseInputMock: IResetUserPasswordUseCase.Input =
  {
    token: faker.datatype.string(),
    new_password: faker.internet.password(),
  };
