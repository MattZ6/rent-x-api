import { faker } from '@faker-js/faker';

import { CreateRentController } from '@presentation/controllers/rent/CreateRent';

export const createRentControllerRequestMock: CreateRentController.Request = {
  body: {
    car_id: faker.datatype.uuid(),
    start_date: faker.datatype.datetime(),
    end_date: faker.datatype.datetime(),
  },
  user_id: faker.datatype.uuid(),
};
