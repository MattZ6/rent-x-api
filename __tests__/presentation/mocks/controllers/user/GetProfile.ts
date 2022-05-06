import { faker } from '@faker-js/faker';

import { UserRole } from '@domain/entities/User';

import { GetUserProfileController } from '@presentation/controllers/user/GetProfile';

export function makeGetUserProfileControllerRequestMock(): GetUserProfileController.Request {
  return {
    headers: undefined,
    params: undefined,
    query: undefined,
    body: undefined,
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    user: {
      id: faker.datatype.uuid(),
      role: faker.helpers.arrayElement<UserRole>(['ADMIN', 'DRIVER']),
    },
  };
}
