import { faker } from '@faker-js/faker';

import { ListAllCarBrandsController } from '@presentation/controllers/car/brand/ListAll';

export function makeListAllCarBrandsControllerRequestMock(): ListAllCarBrandsController.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    headers: undefined,
    params: undefined,
    body: undefined,
    query: {
      sort_by: faker.helpers.arrayElement<ListAllCarBrandsController.SortBy>([
        'name',
        'created_at',
        undefined,
        null,
      ]),
      order_by: faker.helpers.arrayElement<ListAllCarBrandsController.OrderBy>([
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
