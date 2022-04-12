import { UserNotFoundWithThisIdError } from '@domain/errors';
import { IUpdateUserAvatarUseCase } from '@domain/usecases/user/UpdateUserAvatar';

import { IStoreFileProvider } from '@application/protocols/providers/storage';
import { ICheckIfUserExistsByIdRepository } from '@application/protocols/repositories/user';
import {
  ICreateUserAvatarRepository,
  IFindUserAvatarByIdRepository,
  IUpdateUserAvatarRepository,
} from '@application/protocols/repositories/user-avatar';

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
      throw new UserNotFoundWithThisIdError();
    }

    let avatar = await this.findUserAvatarByIdRepository.findById({
      id: user_id,
    });

    const fileData = {
      original_name: file.name,
      mime_type: file.type,
      extension: file.extension,
      size_in_bytes: file.size,
    };

    if (!avatar) {
      avatar = await this.createUserAvatarRepository.create({
        id: user_id,
        ...fileData,
      });
    } else {
      avatar = await this.updateUserAvatarRepository.update({
        ...avatar,
        ...fileData,
      });
    }

    await this.storeFileProvider.store({
      file_name: avatar.id,
      folder_path: this.avatarFolderPath,
      content: file.content,
    });

    return avatar;
  }
}
