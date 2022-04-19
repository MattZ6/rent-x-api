import { faker } from '@faker-js/faker';

import { IListAllCarBrandsUseCase } from '@domain/usecases/car/brand/ListAll';

export function makeListAllCarBrandsUseCaseInputMock(): IListAllCarBrandsUseCase.Input {
  return {
    sort_by: faker.random.arrayElement<IListAllCarBrandsUseCase.SortBy>([
      'name',
      'created_at',
      undefined,
      null,
    ]),
    order_by: faker.random.arrayElement<IListAllCarBrandsUseCase.OrderBy>([
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
