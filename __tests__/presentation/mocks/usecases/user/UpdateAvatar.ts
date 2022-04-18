import { faker } from '@faker-js/faker';

import { IUpdateUserAvatarUseCase } from '@domain/usecases/user/UpdateAvatar';

import { makeUserAvatar } from '../../../../domain/models';

export function makeUpdateUserAvatarUseCaseInputMock(): IUpdateUserAvatarUseCase.Input {
  return {
    user_id: faker.datatype.uuid(),
    file: {
      name: faker.system.fileName(),
      type: faker.system.fileType(),
      extension: faker.system.fileExt(),
      size: faker.datatype.number(),
      content: Buffer.from(faker.datatype.string()),
    },
  };
}

export class UpdateUserAvatarUseCaseSpy implements IUpdateUserAvatarUseCase {
  async execute(
    _: IUpdateUserAvatarUseCase.Input
  ): Promise<IUpdateUserAvatarUseCase.Output> {
    return makeUserAvatar();
  }
}
