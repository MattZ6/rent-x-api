import { faker } from '@faker-js/faker';

import { ResetUserPasswordController } from '@presentation/controllers/user/ResetPassword';

export const resetUserPasswordControllerRequestMock: ResetUserPasswordController.Request =
  {
    headers: undefined,
    params: undefined,
    query: undefined,
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    body: {
      token: faker.datatype.string(),
      new_password: faker.internet.password(),
    },
  };
