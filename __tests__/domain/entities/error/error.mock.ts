import { faker } from '@faker-js/faker';

import { Error } from '@domain/entities/Error';

export function makeErrorEntityMock(): Error {
  return {
    id: faker.datatype.uuid(),
    http_method: faker.internet.httpMethod(),
    resource_uri: faker.internet.url(),
    thrown_at: faker.datatype.string(),
    stack: faker.datatype.string(),
    created_at: faker.datatype.datetime(),
  };
}
