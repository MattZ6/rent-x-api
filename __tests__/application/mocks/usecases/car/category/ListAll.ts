import { faker } from '@faker-js/faker';

import { IListAllCarCategoriesUseCase } from '@domain/usecases/car/category/ListAll';

export function makeListAllCarCategoriesUseCaseDefaultSortByMock(): IListAllCarCategoriesUseCase.SortBy {
  return faker.helpers.arrayElement<IListAllCarCategoriesUseCase.SortBy>([
    'name',
    'created_at',
  ]);
}

export function makeListAllCarCategoriesUseCaseDefaultOrderByMock(): IListAllCarCategoriesUseCase.OrderBy {
  return faker.helpers.arrayElement<IListAllCarCategoriesUseCase.OrderBy>([
    'asc',
    'desc',
  ]);
}

export function makeListAllCarCategoriesUseCaseDefaultLimitMock(): IListAllCarCategoriesUseCase.Limit {
  return faker.datatype.number({ min: 1 });
}

export function makeListAllCarCategoriesUseCaseDefaultOffsetMock(): IListAllCarCategoriesUseCase.Offset {
  return faker.datatype.number({ min: 0 });
}

export function makeListAllCarCategoriesUseCaseInputMock(): IListAllCarCategoriesUseCase.Input {
  return {
    sort_by: makeListAllCarCategoriesUseCaseDefaultSortByMock(),
    order_by: makeListAllCarCategoriesUseCaseDefaultOrderByMock(),
    limit: makeListAllCarCategoriesUseCaseDefaultLimitMock(),
    offset: makeListAllCarCategoriesUseCaseDefaultOffsetMock(),
  };
}
