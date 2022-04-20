import { faker } from '@faker-js/faker';

import { UpdateCarSpecificationController } from '@presentation/controllers/car/specification/Update';

export function makeUpdateCarSpecificationControllerRequestMock(): UpdateCarSpecificationController.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    headers: undefined,
    query: undefined,
    params: {
      id: faker.datatype.uuid(),
    },
    body: {
      name: faker.datatype.string(),
      description: faker.datatype.string(),
    },
  };
}
