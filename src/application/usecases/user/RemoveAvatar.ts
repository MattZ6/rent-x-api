import {
  UserAvatarNotFoundWithProvidedUserIdError,
  UserNotFoundWithProvidedIdError,
} from '@domain/errors';
import { IRemoveUserAvatarUseCase } from '@domain/usecases/user/RemoveAvatar';

import { IDeleteFileProvider } from '@application/protocols/providers/storage';
import {
  ICheckIfUserAvatarExistsByUserIdRepository,
  ICheckIfUserExistsByIdRepository,
  IDeleteUserAvatarByUserIdRepository,
} from '@application/protocols/repositories/user';

export class RemoveUserAvatarUseCase implements IRemoveUserAvatarUseCase {
  constructor(
    private readonly checkIfUserExistsByIdRepository: ICheckIfUserExistsByIdRepository,
    private readonly checkIfUserAvatarExistsByUserIdRepository: ICheckIfUserAvatarExistsByUserIdRepository,
    private readonly deleteFileProvider: IDeleteFileProvider,
    private readonly avatarFolderPath: string,
    private readonly deleteUserAvatarByUserIdRepository: IDeleteUserAvatarByUserIdRepository
  ) {}

  async handle(
    data: IRemoveUserAvatarUseCase.Input
  ): Promise<IRemoveUserAvatarUseCase.Output> {
    const { user_id } = data;

    const userExists =
      await this.checkIfUserExistsByIdRepository.checkIfExistsById({
        id: user_id,
      });

    if (!userExists) {
      throw new UserNotFoundWithProvidedIdError();
    }

    const userAvatarExists =
      await this.checkIfUserAvatarExistsByUserIdRepository.checkIfExistsByUserId(
        { user_id }
      );

    if (!userAvatarExists) {
      throw new UserAvatarNotFoundWithProvidedUserIdError();
    }

    await this.deleteFileProvider.delete({
      file_name: user_id,
      folder_path: this.avatarFolderPath,
    });

    await this.deleteUserAvatarByUserIdRepository.deleteByUserId({ user_id });
  }
}
