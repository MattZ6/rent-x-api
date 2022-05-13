import { faker } from '@faker-js/faker';

import { UserRole } from '@domain/entities/User';

import { UpdateUserPasswordController } from '@presentation/controllers/user/UpdatePassword';

export function makeUpdateUserPasswordControllerRequestMock(): UpdateUserPasswordController.Request {
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
      new_password: faker.internet.password(),
      old_password: faker.internet.password(),
    },
  };
}
