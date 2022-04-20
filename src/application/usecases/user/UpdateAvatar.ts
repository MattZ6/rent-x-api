import { UserNotFoundWithProvidedIdError } from '@domain/errors';
import { IUpdateUserAvatarUseCase } from '@domain/usecases/user/UpdateAvatar';

import { IStoreFileProvider } from '@application/protocols/providers/storage';
import {
  ICheckIfUserExistsByIdRepository,
  IFindUserAvatarByIdRepository,
  IUpdateUserAvatarRepository,
  ICreateUserAvatarRepository,
} from '@application/protocols/repositories/user';

export class UpdateUserAvatarUseCase implements IUpdateUserAvatarUseCase {
  constructor(
    private readonly checkIfUserExistsByIdRepository: ICheckIfUserExistsByIdRepository,
    private readonly findUserAvatarByIdRepository: IFindUserAvatarByIdRepository,
    private readonly updateUserAvatarRepository: IUpdateUserAvatarRepository,
    private readonly createUserAvatarRepository: ICreateUserAvatarRepository,
    private readonly storeFileProvider: IStoreFileProvider,
    private readonly avatarFolderPath: string
  ) {}

  async execute(
    data: IUpdateUserAvatarUseCase.Input
  ): Promise<IUpdateUserAvatarUseCase.Output> {
    const { user_id, file } = data;

    const userExists =
      await this.checkIfUserExistsByIdRepository.checkIfExistsById({
        id: user_id,
      });

    if (!userExists) {
      throw new UserNotFoundWithProvidedIdError();
    }

    let avatar = await this.findUserAvatarByIdRepository.findById({
      user_id,
    });

    if (!avatar) {
      avatar = await this.createUserAvatarRepository.create({
        user_id,
        original_name: file.name,
        mime_type: file.type,
        extension: file.extension,
        size_in_bytes: file.size,
      });
    } else {
      avatar = await this.updateUserAvatarRepository.update({
        user_id,
        original_name: file.name,
        mime_type: file.type,
        extension: file.extension,
        size_in_bytes: file.size,
      });
    }

    await this.storeFileProvider.store({
      file_name: avatar.user_id,
      folder_path: this.avatarFolderPath,
      content: file.content,
    });

    return avatar;
  }
}
