import { faker } from '@faker-js/faker';

import { IListAllCarSpecificationsUseCase } from '@domain/usecases/car/specification/ListAll';

export function makeListAllCarSpecificationsUseCaseInputMock(): IListAllCarSpecificationsUseCase.Input {
  return {
    sort_by: faker.random.arrayElement<IListAllCarSpecificationsUseCase.SortBy>(
      ['name', 'created_at', undefined, null]
    ),
    order_by:
      faker.random.arrayElement<IListAllCarSpecificationsUseCase.OrderBy>([
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
