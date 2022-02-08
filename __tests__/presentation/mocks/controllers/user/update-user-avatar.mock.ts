import { faker } from '@faker-js/faker';

import { UpdateUserAvatarController } from '@presentation/controllers/user/UpdateUserAvatar';

export function makeUpdateUserAvatarControllerRequestMock(): UpdateUserAvatarController.Request {
  return {
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
