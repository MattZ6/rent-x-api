import { faker } from '@faker-js/faker';

import { IListAllCarsUseCase } from '@domain/usecases/car/ListAll';

export function makeListAllCarsUseCaseInputMock(): IListAllCarsUseCase.Input {
  return {
    sort_by: faker.random.arrayElement<IListAllCarsUseCase.SortBy>([
      'name',
      'created_at',
      'horse_power',
      'number_of_seats',
      'max_speed',
      undefined,
      null,
    ]),
    order_by: faker.random.arrayElement<IListAllCarsUseCase.OrderBy>([
      'asc',
      'desc',
      undefined,
      null,
    ]),
    limit: faker.random.arrayElement([
      undefined,
      null,
      faker.datatype.number({
        min: 1,
      }),
    ]),
    offset: faker.random.arrayElement([
      undefined,
      null,
      faker.datatype.number({
        min: 1,
      }),
    ]),
  };
}
