import { faker } from '@faker-js/faker';

import { IListAllCarsUseCase } from '@domain/usecases/car/ListAll';

import { ListCarsController } from '@presentation/controllers/car/ListCars';

export const listCarsControllerDefaultOrderBy: IListAllCarsUseCase.OrderBy =
  faker.random.arrayElement([
    'name',
    'created_at',
    'horse_power',
    'number_of_seats',
    'max_speed',
  ]);
export const listCarsControllerDefaultOrder: IListAllCarsUseCase.Order =
  faker.random.arrayElement(['ASC', 'DESC']);
export const listCarsControllerDefaultLimit = faker.datatype.number({
  min: 10,
  max: 100,
});
export const listCarsControllerDefaultPage = faker.datatype.number({
  min: 1,
  max: 50,
});

export const listCarsControllerRequestMock: ListCarsController.Request = {
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
