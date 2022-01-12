import faker from 'faker';

import { ResetUserPasswordController } from '@presentation/controllers/user/ResetUserPassword';

export const resetUserPasswordControllerRequestMock: ResetUserPasswordController.Request =
  {
    body: {
      token: faker.datatype.string(),
      new_password: faker.internet.password(),
    },
  };
