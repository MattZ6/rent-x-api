import faker from 'faker';

import { GetUserProfileController } from '@presentation/controllers/user/GetUserProfile';

export const getUserProfileControllerRequestMock: GetUserProfileController.Request =
  {
    user_id: faker.datatype.uuid(),
  };
