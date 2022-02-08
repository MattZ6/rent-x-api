import { faker } from '@faker-js/faker';

import { GetCarDetailsController } from '@presentation/controllers/car/GetCarDetails';

export const getCarDetailsControllerRequestMock: GetCarDetailsController.Request =
  {
    params: {
      id: faker.datatype.uuid(),
    },
  };
