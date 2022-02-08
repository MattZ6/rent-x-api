import { faker } from '@faker-js/faker';

import { IUserToken } from '@domain/models/UserToken';

const oneDayInMillisseconds = 1 * 24 * 60 * 60 * 1000;

export const userTokenMock: IUserToken = {
  id: faker.datatype.uuid(),
  token: faker.datatype.uuid(),
  user_id: faker.datatype.uuid(),
  expires_in: new Date(Date.now() + oneDayInMillisseconds),
  created_at: faker.datatype.datetime(),
  updated_at: faker.datatype.datetime(),
};
