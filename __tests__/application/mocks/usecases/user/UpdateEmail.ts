import { faker } from '@faker-js/faker';

import { IUpdateUserEmailUseCase } from '@domain/usecases/user/UpdateEmail';

export function makeUpdateUserEmailUseCaseInputMock(): IUpdateUserEmailUseCase.Input {
  return {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
  };
}
