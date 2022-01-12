import faker from 'faker';

import { RefreshUserAccessTokenController } from '@presentation/controllers/user/RefreshUserAccessToken';

export const refreshUserAccessTokenControllerRequestMock: RefreshUserAccessTokenController.Request =
  {
    body: { refresh_token: faker.datatype.string() },
  };
