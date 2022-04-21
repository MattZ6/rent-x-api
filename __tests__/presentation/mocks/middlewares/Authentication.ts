import { faker } from '@faker-js/faker';

import { AuthenticationMiddleware } from '@presentation/middlewares/Authentication';

export function makeAuthenticationMiddlewareRequestMock(): AuthenticationMiddleware.Request {
  return {
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    headers: {
      'x-access-token': faker.datatype.uuid(),
    },
    params: undefined,
    query: undefined,
    body: undefined,
  };
}
