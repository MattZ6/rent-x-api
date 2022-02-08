import { faker } from '@faker-js/faker';

import { CreateCarBrandController } from '@presentation/controllers/car/brand/CreateCarBrand';

export const createCarBrandControllerRequestMock: CreateCarBrandController.Request =
  {
    body: {
      name: faker.datatype.string(),
    },
  };
