import { faker } from '@faker-js/faker';

import { CreateAccountController } from '@presentation/controllers/user/CreateAccount';

export const createAccountControllerRequestMock: CreateAccountController.Request =
  {
    body: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      driver_license: faker.datatype.string(),
    },
  };
