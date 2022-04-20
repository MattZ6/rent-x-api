import { faker } from '@faker-js/faker';

import { UpdateCarCategoryController } from '@presentation/controllers/car/category/Update';

export function makeUpdateCarCategoryControllerRequestMock(): UpdateCarCategoryController.Request {
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
