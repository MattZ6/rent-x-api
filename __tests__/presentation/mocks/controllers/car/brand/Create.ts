import { faker } from '@faker-js/faker';

import { CreateCarBrandController } from '@presentation/controllers/car/brand/CreateCarBrand';

export const createCarBrandControllerRequestMock: CreateCarBrandController.Request =
  {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    headers: undefined,
    params: undefined,
    query: undefined,
    body: {
      name: faker.datatype.string(),
    },
  };
