import { faker } from '@faker-js/faker';

import { IListAllCarSpecificationsUseCase } from '@domain/usecases/car/specification/ListAll';

export function makeListAllCarSpecificationsUseCaseDefaultSortByMock(): IListAllCarSpecificationsUseCase.SortBy {
  return faker.random.arrayElement<IListAllCarSpecificationsUseCase.SortBy>([
    'name',
    'created_at',
  ]);
}

export function makeListAllCarSpecificationsUseCaseDefaultOrderByMock(): IListAllCarSpecificationsUseCase.OrderBy {
  return faker.random.arrayElement<IListAllCarSpecificationsUseCase.OrderBy>([
    'asc',
    'desc',
  ]);
}

export function makeListAllCarSpecificationsUseCaseDefaultLimitMock(): IListAllCarSpecificationsUseCase.Limit {
  return faker.datatype.number({ min: 1 });
}

export function makeListAllCarSpecificationsUseCaseDefaultOffsetMock(): IListAllCarSpecificationsUseCase.Offset {
  return faker.datatype.number({ min: 0 });
}

export function makeListAllCarSpecificationsUseCaseInputMock(): IListAllCarSpecificationsUseCase.Input {
  return {
    sort_by: makeListAllCarSpecificationsUseCaseDefaultSortByMock(),
    order_by: makeListAllCarSpecificationsUseCaseDefaultOrderByMock(),
    limit: makeListAllCarSpecificationsUseCaseDefaultLimitMock(),
    offset: makeListAllCarSpecificationsUseCaseDefaultOffsetMock(),
  };
}
