import { faker } from '@faker-js/faker';

import { UpdateCarBrandController } from '@presentation/controllers/car/brand/Update';

export const updateCarBrandControllerRequestMock: UpdateCarBrandController.Request =
  {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    headers: undefined,
    query: undefined,
    params: {
      id: faker.datatype.uuid(),
    },
    body: {
      name: faker.datatype.string(),
    },
  };
