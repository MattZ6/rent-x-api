import { faker } from '@faker-js/faker';

import { IUser } from '@domain/entities/User';

export const userMock: IUser = {
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password_hash: faker.internet.password(),
  driver_license: faker.datatype.string(),
  created_at: faker.datatype.datetime(),
  updated_at: faker.datatype.datetime(),
};
