import { faker } from '@faker-js/faker';

import { UpdateCarCategoryController } from '@presentation/controllers/car/category/UpdateCarCategory';

export const updateCarCategoryControllerRequestMock: UpdateCarCategoryController.Request =
  {
    params: {
      id: faker.datatype.uuid(),
    },
    body: {
      name: faker.datatype.string(),
      description: faker.datatype.string(),
    },
  };
