import faker from 'faker';

import { SendForgotUserPasswordMailController } from '@presentation/controllers/user/SendForgotUserPasswordMail';

export const sendForgotUserPasswordMailControllerRequestMock: SendForgotUserPasswordMailController.Request =
  {
    body: {
      email: faker.internet.email(),
    },
  };
