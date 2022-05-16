import { faker } from '@faker-js/faker';

import { UserRole } from '@domain/entities/User';

import { RemoveUserAvatarController } from '@presentation/controllers/user/RemoveAvatar';

export function makeRemoveUserAvatarControllerRequestMock(): RemoveUserAvatarController.Request {
  return {
    headers: undefined,
    params: undefined,
    query: undefined,
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    user: {
      id: faker.datatype.uuid(),
      role: faker.helpers.arrayElement<UserRole>(['ADMIN', 'DRIVER']),
    },
    body: undefined,
  };
}
