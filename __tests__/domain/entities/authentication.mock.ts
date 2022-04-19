import { faker } from '@faker-js/faker';

import { Authentication } from '@domain/entities/Authentication';

export function makeAuthenticationMock(): Authentication {
  return {
    access_token: faker.datatype.string(),
    refresh_token: faker.datatype.uuid(),
  };
}
