import { faker } from '@faker-js/faker';

import { IListAllCarCategoriesUseCase } from '@domain/usecases/car/category/ListAllCarCategories';

export const listAllCarCategoriesUseCaseInputMock: IListAllCarCategoriesUseCase.Input =
  {
    order_by: faker.random.arrayElement(['name', 'created_at']),
    order: faker.random.arrayElement(['ASC', 'DESC']),
    limit: faker.datatype.number({ min: 1, max: 100 }),
    page: faker.datatype.number({ min: 1, max: 30 }),
  };
