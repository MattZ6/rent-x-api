import { faker } from '@faker-js/faker';

import { UserRole } from '@domain/entities/User';

import { ListAllUserRentalsController } from '@presentation/controllers/rent/user/ListAll';

export function makeListAllUserRentalsControllerRequestMock(): ListAllUserRentalsController.Request {
  return {
    headers: undefined,
    params: undefined,
    body: undefined,
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    user: {
      id: faker.datatype.uuid(),
      role: faker.helpers.arrayElement<UserRole>(['ADMIN', 'DRIVER']),
    },
    query: {
      limit: faker.datatype.number({ min: 1 }),
      offset: faker.datatype.number({ min: 0 }),
    },
  };
}
