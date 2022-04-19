import { faker } from '@faker-js/faker';

import { UserAvatar } from '@domain/entities/UserAvatar';

export function makeUserAvatarMock(): UserAvatar {
  const date = faker.datatype.datetime();

  return {
    id: faker.datatype.uuid(),
    original_name: faker.system.fileName(),
    extension: faker.system.fileExt(),
    mime_type: faker.system.mimeType(),
    size_in_bytes: faker.datatype.number(),
    created_at: date,
    updated_at: date,
  };
}
