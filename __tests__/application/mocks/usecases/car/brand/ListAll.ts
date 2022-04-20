import { faker } from '@faker-js/faker';

import { IListAllCarBrandsUseCase } from '@domain/usecases/car/brand/ListAll';

export function makeListAllCarBrandsUseCaseDefaultSortByMock(): IListAllCarBrandsUseCase.SortBy {
  return faker.random.arrayElement<IListAllCarBrandsUseCase.SortBy>([
    'name',
    'created_at',
  ]);
}

export function makeListAllCarBrandsUseCaseDefaultOrderByMock(): IListAllCarBrandsUseCase.OrderBy {
  return faker.random.arrayElement<IListAllCarBrandsUseCase.OrderBy>([
    'asc',
    'desc',
  ]);
}

export function makeListAllCarBrandsUseCaseDefaultLimitMock(): IListAllCarBrandsUseCase.Limit {
  return faker.datatype.number({ min: 1 });
}

export function makeListAllCarBrandsUseCaseDefaultOffsetMock(): IListAllCarBrandsUseCase.Offset {
  return faker.datatype.number({ min: 0 });
}

export function makeListAllCarBrandsUseCaseInputMock(): IListAllCarBrandsUseCase.Input {
  return {
    sort_by: makeListAllCarBrandsUseCaseDefaultSortByMock(),
    order_by: makeListAllCarBrandsUseCaseDefaultOrderByMock(),
    limit: makeListAllCarBrandsUseCaseDefaultLimitMock(),
    offset: makeListAllCarBrandsUseCaseDefaultOffsetMock(),
  };
}
