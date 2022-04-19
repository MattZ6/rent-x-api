import { faker } from '@faker-js/faker';

import { IListAllCarBrandsUseCase } from '@domain/usecases/car/brand/ListAll';

export const listAllCarBrandsUseCaseInputMock: IListAllCarBrandsUseCase.Input =
  {
    sort_by: faker.random.arrayElement(['name', 'created_at']),
    order_by: faker.random.arrayElement(['ASC', 'DESC']),
    limit: faker.datatype.number({ min: 1, max: 100 }),
    offset: faker.datatype.number({ min: 1, max: 30 }),
  };
