import { faker } from '@faker-js/faker';

import { IRemoveUserAvatarUseCase } from '@domain/usecases/user/RemoveAvatar';

export function makeRemoveUserAvatarUseCaseAvatarPathMock() {
  return faker.system.directoryPath();
}

export function makeRemoveUserAvatarUseCaseInputMock(): IRemoveUserAvatarUseCase.Input {
  return {
    user_id: faker.datatype.uuid(),
  };
}
