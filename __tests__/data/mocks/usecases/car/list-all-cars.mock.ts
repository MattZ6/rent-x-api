import { faker } from '@faker-js/faker';

import { IListAllCarsUseCase } from '@domain/usecases/car/ListAllCars';

export const listAllCarsUseCaseInputMock: IListAllCarsUseCase.Input = {
  order_by: faker.random.arrayElement([
    'name',
    'created_at',
    'horse_power',
    'number_of_seats',
    'max_speed',
  ]),
  order: faker.random.arrayElement(['ASC', 'DESC']),
  page: faker.datatype.number({ min: 1, max: 50 }),
  limit: faker.datatype.number({ min: 10, max: 1000 }),
};
