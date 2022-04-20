import { faker } from '@faker-js/faker';

import { CreateRentController } from '@presentation/controllers/rent/Create';

export function makeCreateRentControllerRequestMock(): CreateRentController.Request {
  return {
    headers: undefined,
    params: undefined,
    query: undefined,
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    body: {
      car_id: faker.datatype.uuid(),
      start_date: faker.datatype.datetime(),
      end_date: faker.datatype.datetime(),
    },
    user_id: faker.datatype.uuid(),
  };
}
