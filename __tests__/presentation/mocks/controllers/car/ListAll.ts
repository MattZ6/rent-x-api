import { faker } from '@faker-js/faker';

import { ListAllCarsController } from '@presentation/controllers/car/ListAll';

export const listAllCarsControllerRequestMock: ListAllCarsController.Request = {
  headers: undefined,
  params: undefined,
  body: undefined,
  method: faker.internet.httpMethod(),
  original_url: faker.internet.url(),
  query: {
    sort_by: faker.random.arrayElement<ListAllCarsController.SortBy>([
      'name',
      'created_at',
      'horse_power',
      'number_of_seats',
      'max_speed',
    ]),
    order_by: faker.random.arrayElement<ListAllCarsController.OrderBy>([
      'asc',
      'desc',
    ]),
    limit: faker.datatype.number({ min: 1 }),
    offset: faker.datatype.number({ min: 0 }),
  },
};
