import { faker } from '@faker-js/faker';

import { GetUserProfileController } from '@presentation/controllers/user/GetProfile';

export const getUserProfileControllerRequestMock: GetUserProfileController.Request =
  {
    headers: undefined,
    params: undefined,
    query: undefined,
    body: undefined,
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    user_id: faker.datatype.uuid(),
  };
