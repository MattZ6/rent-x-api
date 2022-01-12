import faker from 'faker';

import { ListCarCategoriesController } from '@presentation/controllers/car/category/ListCarCategories';

export const listCarCategoriesControllerDefaultOrderBy = 'created_at';
export const listCarCategoriesControllerDefaultOrder = 'DESC';
export const listCarCategoriesControllerDefaultLimit = faker.datatype.number({
  min: 10,
  max: 100,
});
export const listCarCategoriesControllerDefaultPage = faker.datatype.number({
  min: 1,
  max: 50,
});

export const listCarCategoriesControllerRequestMock: ListCarCategoriesController.Request =
  {
    query: {
      order_by: faker.random.arrayElement(['name', 'created_at']),
      order: faker.random.arrayElement(['ASC', 'DESC']),
      limit: faker.datatype.number({ min: 10, max: 100 }),
      page: faker.datatype.number({ min: 1, max: 50 }),
    },
  };
