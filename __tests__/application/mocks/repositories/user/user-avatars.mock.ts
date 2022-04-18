import {
  ICreateUserAvatarRepository,
  IFindUserAvatarByIdRepository,
  IUpdateUserAvatarRepository,
} from '@application/protocols/repositories/user-avatar';

import { makeUserAvatar } from '../../../../domain/entities';

export class FindUserAvatarByIdRepositorySpy
  implements IFindUserAvatarByIdRepository
{
  async findById(
    data: IFindUserAvatarByIdRepository.Input
  ): Promise<IFindUserAvatarByIdRepository.Output> {
    const { id } = data;

    const userAvatar = makeUserAvatar();

    Object.assign(userAvatar, { id });

    return userAvatar;
  }
}

export class UpdateUserAvatarRepositorySpy
  implements IUpdateUserAvatarRepository
{
  async update(
    data: IUpdateUserAvatarRepository.Input
  ): Promise<IUpdateUserAvatarRepository.Output> {
    return data;
  }
}

export class CreateUserAvatarRepositorySpy
  implements ICreateUserAvatarRepository
{
  async create(
    data: ICreateUserAvatarRepository.Input
  ): Promise<ICreateUserAvatarRepository.Output> {
    const { id, mime_type, size_in_bytes, original_name, extension } = data;

    const userAvatar = makeUserAvatar();

    Object.assign(userAvatar, {
      id,
      mime_type,
      size_in_bytes,
      original_name,
      extension,
    });

    return userAvatar;
  }
}
