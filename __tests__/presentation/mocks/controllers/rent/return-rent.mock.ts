import faker from 'faker';

import { ReturnRentController } from '@presentation/controllers/rent/ReturnRent';

export const returnRentControllerRequestMock: ReturnRentController.Request = {
  user_id: faker.datatype.uuid(),
  params: {
    id: faker.datatype.uuid(),
  },
};
