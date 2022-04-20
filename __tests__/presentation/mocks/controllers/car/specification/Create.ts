import { faker } from '@faker-js/faker';

import { CreateCarSpecificationController } from '@presentation/controllers/car/specification/Create';

export function makeCreateCarSpecificationControllerRequestMock(): CreateCarSpecificationController.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    headers: undefined,
    params: undefined,
    query: undefined,
    body: {
      name: faker.datatype.string(),
      description: faker.datatype.string(),
    },
  };
}
