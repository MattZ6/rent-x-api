import { IRemoveUserAvatarUseCase } from '@domain/usecases/user/RemoveAvatar';

export class RemoveUserAvatarUseCaseSpy implements IRemoveUserAvatarUseCase {
  async execute(
    _: IRemoveUserAvatarUseCase.Input
  ): Promise<IRemoveUserAvatarUseCase.Output> {
    // That's all
  }
}
