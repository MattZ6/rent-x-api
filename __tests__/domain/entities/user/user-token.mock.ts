import { faker } from '@faker-js/faker';

import { IUserToken, UserToken } from '@domain/entities/UserToken';

const oneDayInMillisseconds = 1 * 24 * 60 * 60 * 1000;

export const userTokenMock: IUserToken = {
  id: faker.datatype.uuid(),
  token: faker.datatype.uuid(),
  user_id: faker.datatype.uuid(),
  expires_in: new Date(Date.now() + oneDayInMillisseconds),
  created_at: faker.datatype.datetime(),
  updated_at: faker.datatype.datetime(),
};

export function makeUserTokenMock(): UserToken {
  const date = faker.datatype.datetime();

  return {
    id: faker.datatype.uuid(),
    token: faker.datatype.uuid(),
    user_id: faker.datatype.uuid(),
    expires_in: faker.date.soon(faker.datatype.number({ min: 1 }), date),
    created_at: date,
    updated_at: date,
  };
}
