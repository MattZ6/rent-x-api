import { faker } from '@faker-js/faker';

import { IListAllCarsUseCase } from '@domain/usecases/car/ListAll';

import { ListAllCarsController } from '@presentation/controllers/car/ListAll';

export const listAllCarsControllerDefaultOrderBy: IListAllCarsUseCase.SortBy =
  faker.random.arrayElement([
    'name',
    'created_at',
    'horse_power',
    'number_of_seats',
    'max_speed',
  ]);
export const listAllCarsControllerDefaultOrder: IListAllCarsUseCase.OrderBy =
  faker.random.arrayElement(['ASC', 'DESC']);
export const listAllCarsControllerDefaultLimit = faker.datatype.number({
  min: 10,
  max: 100,
});
export const listAllCarsControllerDefaultPage = faker.datatype.number({
  min: 1,
  max: 50,
});

export const listAllCarsControllerRequestMock: ListAllCarsController.Request = {
  headers: undefined,
  params: undefined,
  body: undefined,
  method: faker.internet.httpMethod(),
  original_url: faker.internet.url(),
  query: {
    order_by: faker.random.arrayElement([
      'name',
      'created_at',
      'horse_power',
      'number_of_seats',
      'max_speed',
    ]),
    order: faker.random.arrayElement(['ASC', 'DESC']),
    limit: faker.datatype.number({ min: 10, max: 100 }),
    page: faker.datatype.number({ min: 1, max: 50 }),
  },
};
