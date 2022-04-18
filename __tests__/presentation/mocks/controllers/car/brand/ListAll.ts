import { faker } from '@faker-js/faker';

import { ListAllCarBrandsController } from '@presentation/controllers/car/brand/ListAll';

export const listAllCarBrandsControllerDefaultOrderByMock = 'created_at';
export const listAllCarBrandsControllerDefaultOrderMock = 'DESC';
export const listAllCarBrandsControllerDefaultLimitMock = faker.datatype.number(
  {
    min: 10,
    max: 100,
  }
);
export const listAllCarBrandsControllerDefaultPageMock = faker.datatype.number({
  min: 1,
  max: 50,
});

export const listAllCarBrandsControllerRequestMock: ListAllCarBrandsController.Request =
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
