import { faker } from '@faker-js/faker';

import { AuthenticateUserController } from '@presentation/controllers/user/Authenticate';

export const authenticateUserControllerRequestMock: AuthenticateUserController.Request =
  {
    headers: undefined,
    params: undefined,
    query: undefined,
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    body: {
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
  };
