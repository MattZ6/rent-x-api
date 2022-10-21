import { faker } from '@faker-js/faker';

import { IUpdateUserNameUseCase } from '@domain/usecases/user/UpdateName';

export function makeUpdateUserNameUseCaseInputMock(): IUpdateUserNameUseCase.Input {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.fullName(),
  };
}
