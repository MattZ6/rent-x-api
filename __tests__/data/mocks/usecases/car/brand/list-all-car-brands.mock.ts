import faker from 'faker';

import { IListAllCarBrandsUseCase } from '@domain/usecases/car/brand/ListAllCarBrands';

export const listAllCarBrandsUseCaseInputMock: IListAllCarBrandsUseCase.Input =
  {
    order_by: faker.random.arrayElement(['name', 'created_at']),
    order: faker.random.arrayElement(['ASC', 'DESC']),
    limit: faker.datatype.number({ min: 1, max: 100 }),
    page: faker.datatype.number({ min: 1, max: 30 }),
  };
