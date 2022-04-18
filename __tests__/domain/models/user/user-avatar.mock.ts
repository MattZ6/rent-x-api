import { faker } from '@faker-js/faker';

import { IUserAvatar } from '@domain/models/UserAvatar';

export function makeUserAvatar(): IUserAvatar {
  return {
    id: faker.datatype.uuid(),
    original_name: faker.system.fileName(),
    extension: faker.system.fileExt(),
    mime_type: faker.system.mimeType(),
    size_in_bytes: faker.datatype.number(),
    created_at: faker.datatype.datetime(),
    updated_at: faker.datatype.datetime(),
  };
}
