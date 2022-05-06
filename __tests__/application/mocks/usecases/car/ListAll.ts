import { faker } from '@faker-js/faker';

import { IListAllCarsUseCase } from '@domain/usecases/car/ListAll';

export function makeListAllCarsUseCaseDefaultSortByMock(): IListAllCarsUseCase.SortBy {
  return faker.helpers.arrayElement<IListAllCarsUseCase.SortBy>([
    'name',
    'created_at',
    'horse_power',
    'max_speed',
    'number_of_seats',
  ]);
}

export function makeListAllCarsUseCaseDefaultOrderByMock(): IListAllCarsUseCase.OrderBy {
  return faker.helpers.arrayElement<IListAllCarsUseCase.OrderBy>([
    'asc',
    'desc',
  ]);
}

export function makeListAllCarsUseCaseDefaultLimitMock(): IListAllCarsUseCase.Limit {
  return faker.datatype.number({ min: 1 });
}

export function makeListAllCarsUseCaseDefaultOffsetMock(): IListAllCarsUseCase.Offset {
  return faker.datatype.number({ min: 0 });
}

export function makeListAllCarsUseCaseInputMock(): IListAllCarsUseCase.Input {
  return {
    brand_id: faker.helpers.arrayElement([
      undefined,
      null,
      faker.datatype.uuid(),
    ]),
    category_id: faker.helpers.arrayElement([
      undefined,
      null,
      faker.datatype.uuid(),
    ]),
    sort_by: makeListAllCarsUseCaseDefaultSortByMock(),
    order_by: makeListAllCarsUseCaseDefaultOrderByMock(),
    limit: makeListAllCarsUseCaseDefaultLimitMock(),
    offset: makeListAllCarsUseCaseDefaultOffsetMock(),
  };
}
