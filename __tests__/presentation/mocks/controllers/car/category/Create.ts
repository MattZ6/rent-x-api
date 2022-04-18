import { faker } from '@faker-js/faker';

import { CreateCarCategoryController } from '@presentation/controllers/car/category/Create';

export const createCarCategoryControllerRequestMock: CreateCarCategoryController.Request =
  {
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
