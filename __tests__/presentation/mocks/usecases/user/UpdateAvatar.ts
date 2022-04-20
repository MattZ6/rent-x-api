import { IUpdateUserAvatarUseCase } from '@domain/usecases/user/UpdateAvatar';

import { makeUserAvatarMock } from '../../../../domain/entities';

// export function makeUpdateUserAvatarUseCaseInputMock(): IUpdateUserAvatarUseCase.Input {
//   return {
//     user_id: faker.datatype.uuid(),
//     file: {
//       name: faker.system.fileName(),
//       type: faker.system.fileType(),
//       extension: faker.system.fileExt(),
//       size: faker.datatype.number(),
//       content: Buffer.from(faker.datatype.string()),
//     },
//   };
// }

export function makeUpdateUserAvatarUseCaseOutputMock(): IUpdateUserAvatarUseCase.Output {
  return makeUserAvatarMock();
}

export class UpdateUserAvatarUseCaseSpy implements IUpdateUserAvatarUseCase {
  async execute(
    _: IUpdateUserAvatarUseCase.Input
  ): Promise<IUpdateUserAvatarUseCase.Output> {
    return makeUpdateUserAvatarUseCaseOutputMock();
  }
}
