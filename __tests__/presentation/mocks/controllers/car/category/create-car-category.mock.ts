import faker from 'faker';

import { CreateCarCategoryController } from '@presentation/controllers/car/category/CreateCarCategory';

export const createCarCategoryControllerRequestMock: CreateCarCategoryController.Request =
  {
    body: {
      name: faker.datatype.string(),
      description: faker.datatype.string(),
    },
  };
