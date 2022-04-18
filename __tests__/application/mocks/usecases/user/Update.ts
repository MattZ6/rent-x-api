import { faker } from '@faker-js/faker';

import { IUpdateUserAvatarUseCase } from '@domain/usecases/user/UpdateAvatar';

export function makeUpdateUserAvatarUseCaseAvatarPathMock() {
  return faker.system.directoryPath();
}

export function makeUpdateUserAvatarUseCaseInputMock(): IUpdateUserAvatarUseCase.Input {
  return {
    user_id: faker.datatype.uuid(),
    file: {
      name: faker.system.fileName(),
      extension: faker.system.fileExt(),
      type: faker.system.mimeType(),
      size: faker.datatype.number(),
      content: Buffer.from(faker.datatype.string()),
    },
  };
}
