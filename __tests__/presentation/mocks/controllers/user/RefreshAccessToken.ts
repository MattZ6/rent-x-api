import { faker } from '@faker-js/faker';

import { RefreshUserAccessTokenController } from '@presentation/controllers/user/RefreshAccessToken';

export function makeRefreshUserAccessTokenControllerRequestMock(): RefreshUserAccessTokenController.Request {
  return {
    headers: undefined,
    params: undefined,
    query: undefined,
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    body: { refresh_token: faker.datatype.string() },
  };
}
