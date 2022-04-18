import { faker } from '@faker-js/faker';

import { UpdateUserAvatarController } from '@presentation/controllers/user/UpdateUserAvatar';

export function makeUpdateUserAvatarControllerRequestMock(): UpdateUserAvatarController.Request {
  return {
    headers: undefined,
    params: undefined,
    query: undefined,
    method: faker.internet.httpMethod(),
    original_url: faker.internet.url(),
    user_id: faker.datatype.uuid(),
    body: {
      file: {
        originalname: faker.system.fileName(),
        mimetype: faker.system.mimeType(),
        size: faker.datatype.number(),
        buffer: Buffer.from(faker.datatype.string()),
      },
    },
  };
}
