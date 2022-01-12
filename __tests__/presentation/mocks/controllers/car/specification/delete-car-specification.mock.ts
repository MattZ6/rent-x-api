import faker from 'faker';

import { DeleteCarSpecificationController } from '@presentation/controllers/car/specification/DeleteCarSpecification';

export const deleteCarSpecificationControllerRequestMock: DeleteCarSpecificationController.Request =
  {
    params: {
      id: faker.datatype.uuid(),
    },
  };
