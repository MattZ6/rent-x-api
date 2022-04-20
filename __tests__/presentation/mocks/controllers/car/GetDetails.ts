import { faker } from '@faker-js/faker';

import { GetCarDetailsController } from '@presentation/controllers/car/GetDetails';

export function makeGetCarDetailsControllerRequestMock(): GetCarDetailsController.Request {
  return {
    headers: undefined,
    query: undefined,
    body: undefined,
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    params: {
      id: faker.datatype.uuid(),
    },
  };
}
