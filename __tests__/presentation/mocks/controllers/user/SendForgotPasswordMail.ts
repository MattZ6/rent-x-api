import { faker } from '@faker-js/faker';

import { SendForgotUserPasswordMailController } from '@presentation/controllers/user/SendForgotPasswordMail';

export function makeSendForgotUserPasswordMailControllerRequestMock(): SendForgotUserPasswordMailController.Request {
  return {
    headers: undefined,
    params: undefined,
    query: undefined,
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    body: {
      email: faker.internet.email(),
    },
  };
}
