import { faker } from '@faker-js/faker';

import { UserToken } from '@domain/entities/UserToken';

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
