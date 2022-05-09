import { faker } from '@faker-js/faker';

import { UserRole } from '@domain/entities/User';

import { UpdateUserEmailController } from '@presentation/controllers/user/UpdateEmail';

export function makeUpdateUserEmailControllerRequestMock(): UpdateUserEmailController.Request {
  return {
    headers: undefined,
    params: undefined,
    query: undefined,
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    user: {
      id: faker.datatype.uuid(),
      role: faker.helpers.arrayElement<UserRole>(['ADMIN', 'DRIVER']),
    },
    body: {
      email: faker.internet.email(),
    },
  };
}
