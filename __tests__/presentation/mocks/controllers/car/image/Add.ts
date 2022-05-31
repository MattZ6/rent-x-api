import { faker } from '@faker-js/faker';

import { UserRole } from '@domain/entities/User';

import { AddImagesToCarController } from '@presentation/controllers/car/images/Add';

export function makeAddImagesToCarControllerRequestMock(): AddImagesToCarController.Request {
  return {
    headers: undefined,
    params: {
      id: faker.datatype.uuid(),
    },
    query: undefined,
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    body: undefined,
    user: {
      id: faker.datatype.uuid(),
      role: faker.helpers.arrayElement<UserRole>(['ADMIN', 'DRIVER']),
    },
    files: faker.helpers.uniqueArray(
      () => ({
        name: faker.system.fileName(),
        mimetype: faker.system.mimeType(),
        size: faker.datatype.number(),
        buffer: Buffer.from(faker.datatype.string()),
      }),
      faker.datatype.number({ min: 1, max: 50 })
    ),
  };
}
