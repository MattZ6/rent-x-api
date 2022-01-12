import faker from 'faker';

import { UpdateCarBrandController } from '@presentation/controllers/car/brand/UpdateCarBrand';

export const updateCarBrandControllerRequestMock: UpdateCarBrandController.Request =
  {
    params: {
      id: faker.datatype.uuid(),
    },
    body: {
      name: faker.datatype.string(),
    },
  };
