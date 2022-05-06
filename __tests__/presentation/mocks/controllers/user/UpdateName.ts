import { faker } from '@faker-js/faker';

import { UserRole } from '@domain/entities/User';

import { UpdateUserNameController } from '@presentation/controllers/user/UpdateName';

export function makeUpdateUserNameControllerRequestMock(): UpdateUserNameController.Request {
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
      name: faker.name.findName(),
    },
  };
}
