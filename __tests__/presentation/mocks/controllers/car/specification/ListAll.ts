import { faker } from '@faker-js/faker';

import { ListAllCarSpecificationsController } from '@presentation/controllers/car/specification/ListAll';

export function makeListAllCarSpecificationsControllerRequestMock(): ListAllCarSpecificationsController.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    headers: undefined,
    params: undefined,
    body: undefined,
    query: {
      sort_by:
        faker.random.arrayElement<ListAllCarSpecificationsController.SortBy>([
          'name',
          'created_at',
          undefined,
          null,
        ]),
      order_by:
        faker.random.arrayElement<ListAllCarSpecificationsController.OrderBy>([
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
