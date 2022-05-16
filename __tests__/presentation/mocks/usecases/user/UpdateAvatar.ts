import { IUpdateUserAvatarUseCase } from '@domain/usecases/user/UpdateAvatar';

import { makeUserAvatarMock } from '../../../../domain/entities';

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
