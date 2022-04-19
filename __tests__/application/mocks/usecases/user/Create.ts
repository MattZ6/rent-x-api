import { faker } from '@faker-js/faker';

import { UserRole } from '@domain/entities/User';
import { ICreateUserUseCase } from '@domain/usecases/user/Create';

export function makeCreateUserUseCaseInputMock(): ICreateUserUseCase.Input {
  return {
    name: faker.name.findName(),
    role: faker.random.arrayElement<UserRole>(['ADMIN', 'DRIVER']),
    driver_license: faker.datatype.string(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
