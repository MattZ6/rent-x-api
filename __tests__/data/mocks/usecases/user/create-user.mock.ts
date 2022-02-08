import { faker } from '@faker-js/faker';

import { ICreateUserUseCase } from '@domain/usecases/user/CreateUser';

export const createUserUseCaseInputMock: ICreateUserUseCase.Input = {
  name: faker.name.findName(),
  driver_license: faker.datatype.string(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};
