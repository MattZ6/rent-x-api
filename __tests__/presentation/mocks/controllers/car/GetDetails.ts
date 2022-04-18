import { faker } from '@faker-js/faker';

import { GetCarDetailsController } from '@presentation/controllers/car/GetCarDetails';

export const getCarDetailsControllerRequestMock: GetCarDetailsController.Request =
  {
    headers: undefined,
    query: undefined,
    body: undefined,
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    params: {
      id: faker.datatype.uuid(),
    },
  };
