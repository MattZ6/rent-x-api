import { faker } from '@faker-js/faker';

import { IListAllCarCategoriesUseCase } from '@domain/usecases/car/category/ListAll';

export function makeListAllCarCategoriesUseCaseInputMock(): IListAllCarCategoriesUseCase.Input {
  return {
    sort_by: faker.random.arrayElement<IListAllCarCategoriesUseCase.SortBy>([
      'name',
      'created_at',
      undefined,
      null,
    ]),
    order_by: faker.random.arrayElement<IListAllCarCategoriesUseCase.OrderBy>([
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
