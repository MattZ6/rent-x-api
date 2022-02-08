import { faker } from '@faker-js/faker';

import { AuthenticateUserController } from '@presentation/controllers/user/AuthenticateUser';

export const authenticateUserControllerRequestMock: AuthenticateUserController.Request =
  {
    body: {
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
  };
