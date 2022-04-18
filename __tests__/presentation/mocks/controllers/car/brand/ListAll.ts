import { faker } from '@faker-js/faker';

import { ListCarBrandsController } from '@presentation/controllers/car/brand/ListCarBrands';

export const listCarBrandsControllerDefaultOrderByMock = 'created_at';
export const listCarBrandsControllerDefaultOrderMock = 'DESC';
export const listCarBrandsControllerDefaultLimitMock = faker.datatype.number({
  min: 10,
  max: 100,
});
export const listCarBrandsControllerDefaultPageMock = faker.datatype.number({
  min: 1,
  max: 50,
});

export const listCarBrandsControllerRequestMock: ListCarBrandsController.Request =
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
