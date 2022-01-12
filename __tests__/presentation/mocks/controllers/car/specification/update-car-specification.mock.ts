import faker from 'faker';

import { UpdateCarSpecificationController } from '@presentation/controllers/car/specification/UpdateCarSpecification';

export const updateCarSpecificationControllerRequestMock: UpdateCarSpecificationController.Request =
  {
    params: {
      id: faker.datatype.uuid(),
    },
    body: {
      name: faker.datatype.string(),
      description: faker.datatype.string(),
    },
  };
