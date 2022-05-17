import { faker } from '@faker-js/faker';

import { AddSpecificationsToCarController } from '@presentation/controllers/car/specification/AddToCar';

export function makeAddSpecificationsToCarControllerRequestMock(): AddSpecificationsToCarController.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    headers: undefined,
    params: {
      id: faker.datatype.string(),
    },
    query: undefined,
    body: {
      specifications_ids: [
        faker.datatype.string(),
        faker.datatype.string(),
        faker.datatype.string(),
      ],
    },
  };
}
