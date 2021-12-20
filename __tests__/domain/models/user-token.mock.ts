import faker from 'faker';

import { IUserToken } from '@domain/models/UserToken';

export const userTokenMock: IUserToken = {
  id: faker.datatype.uuid(),
  token: faker.datatype.uuid(),
  user_id: faker.datatype.uuid(),
  expires_in: faker.datatype.datetime(),
  created_at: faker.datatype.datetime(),
  updated_at: faker.datatype.datetime(),
};
