import { faker } from '@faker-js/faker';

import { ICreateUserUseCase } from '@domain/usecases/user/Create';

export function makeCreateUserUseCaseInputMock(): ICreateUserUseCase.Input {
  return {
    name: faker.name.fullName(),
    driver_license: faker.datatype.string(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
