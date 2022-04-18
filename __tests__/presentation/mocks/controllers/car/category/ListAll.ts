import { faker } from '@faker-js/faker';

import { ListAllCarCategoriesController } from '@presentation/controllers/car/category/ListAll';

export const listAllCarCategoriesControllerDefaultOrderBy = 'created_at';
export const listAllCarCategoriesControllerDefaultOrder = 'DESC';
export const listAllCarCategoriesControllerDefaultLimit = faker.datatype.number(
  {
    min: 10,
    max: 100,
  }
);
export const listAllCarCategoriesControllerDefaultPage = faker.datatype.number({
  min: 1,
  max: 50,
});

export const listAllCarCategoriesControllerRequestMock: ListAllCarCategoriesController.Request =
  {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    headers: undefined,
    params: undefined,
    body: undefined,
    query: {
      order_by: faker.random.arrayElement(['name', 'created_at']),
      order: faker.random.arrayElement(['ASC', 'DESC']),
      limit: faker.datatype.number({ min: 10, max: 100 }),
      page: faker.datatype.number({ min: 1, max: 50 }),
    },
  };
