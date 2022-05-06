import { faker } from '@faker-js/faker';

import { AdminMiddleware } from '@presentation/middlewares/Admin';

export function makeAdminMiddlewareRequestMock(): AdminMiddleware.Request {
  return {
    user: {
      id: faker.datatype.uuid(),
      role: 'ADMIN',
    },
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    headers: undefined,
    params: undefined,
    query: undefined,
    body: undefined,
  };
}
