import { faker } from '@faker-js/faker';

import { ListAllCarCategoriesController } from '@presentation/controllers/car/category/ListAll';

export function makeListAllCarCategoriesControllerRequestMock(): ListAllCarCategoriesController.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    headers: undefined,
    params: undefined,
    body: undefined,
    query: {
      sort_by:
        faker.helpers.arrayElement<ListAllCarCategoriesController.SortBy>([
          'name',
          'created_at',
          undefined,
          null,
        ]),
      order_by:
        faker.helpers.arrayElement<ListAllCarCategoriesController.OrderBy>([
          'asc',
          'desc',
          undefined,
          null,
        ]),
      limit: faker.datatype.number({ min: 1 }),
      offset: faker.datatype.number({ min: 0 }),
    },
  };
}
