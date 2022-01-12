import faker from 'faker';

import { CreateCarSpecificationController } from '@presentation/controllers/car/specification/CreateCarSpecification';

export const createCarSpecificationControllerRequestMock: CreateCarSpecificationController.Request =
  {
    body: {
      name: faker.datatype.string(),
      description: faker.datatype.string(),
    },
  };
