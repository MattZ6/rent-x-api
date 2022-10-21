import { faker } from '@faker-js/faker';

import { CreateAccountController } from '@presentation/controllers/user/Create';

export function makeCreateAccountControllerRequestMock(): CreateAccountController.Request {
  return {
    headers: undefined,
    params: undefined,
    query: undefined,
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    body: {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      driver_license: faker.datatype.string(),
    },
  };
}
