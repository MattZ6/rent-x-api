import { faker } from '@faker-js/faker';

import { UserRole } from '@domain/entities/User';

import { GetCarScheduleController } from '@presentation/controllers/rent/car/GetSchedule';

export function makeGetCarScheduleControllerRequestMock(): GetCarScheduleController.Request {
  return {
    params: {
      id: faker.datatype.uuid(),
    },
    body: undefined,
    query: undefined,
    headers: undefined,
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    user: {
      id: faker.datatype.uuid(),
      role: faker.helpers.arrayElement<UserRole>(['ADMIN', 'DRIVER']),
    },
  };
}
