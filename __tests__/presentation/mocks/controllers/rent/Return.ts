import { faker } from '@faker-js/faker';

import { ReturnRentController } from '@presentation/controllers/rent/Return';

export const returnRentControllerRequestMock: ReturnRentController.Request = {
  headers: undefined,
  query: undefined,
  body: undefined,
  method: faker.internet.httpMethod(),
  original_url: faker.internet.url(),
  user_id: faker.datatype.uuid(),
  params: {
    id: faker.datatype.uuid(),
  },
};
