import { faker } from '@faker-js/faker';

import { DeleteCarSpecificationController } from '@presentation/controllers/car/specification/Delete';

export function makeDeleteCarSpecificationControllerRequestMock(): DeleteCarSpecificationController.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    headers: undefined,
    body: undefined,
    query: undefined,
    params: {
      id: faker.datatype.uuid(),
    },
  };
}
