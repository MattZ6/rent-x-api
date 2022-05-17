import { faker } from '@faker-js/faker';

import { RemoveSpecificationFromCarController } from '@presentation/controllers/car/specification/RemoveFromCar';

export function makeRemoveSpecificationFromCarControllerRequestMock(): RemoveSpecificationFromCarController.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    headers: undefined,
    params: {
      id: faker.datatype.string(),
      specification_id: faker.datatype.string(),
    },
    query: undefined,
    body: undefined,
  };
}
