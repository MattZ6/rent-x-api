import { faker } from '@faker-js/faker';

import { UserRole } from '@domain/entities/User';

import { UpdateUserAvatarController } from '@presentation/controllers/user/UpdateAvatar';

export function makeUpdateUserAvatarControllerRequestMock(): UpdateUserAvatarController.Request {
  return {
    headers: undefined,
    params: undefined,
    query: undefined,
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    body: undefined,
    user: {
      id: faker.datatype.uuid(),
      role: faker.helpers.arrayElement<UserRole>(['ADMIN', 'DRIVER']),
    },
    file: {
      name: faker.system.fileName(),
      mimetype: faker.system.mimeType(),
      size: faker.datatype.number(),
      buffer: Buffer.from(faker.datatype.string()),
    },
  };
}
