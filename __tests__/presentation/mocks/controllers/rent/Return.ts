import { faker } from '@faker-js/faker';

import { UserRole } from '@domain/entities/User';

import { ReturnRentController } from '@presentation/controllers/rent/Return';

export function makeReturnRentControllerRequestMock(): ReturnRentController.Request {
  return {
    headers: undefined,
    query: undefined,
    body: undefined,
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    user: {
      id: faker.datatype.uuid(),
      role: faker.helpers.arrayElement<UserRole>(['ADMIN', 'DRIVER']),
    },
    params: {
      id: faker.datatype.uuid(),
    },
  };
}
