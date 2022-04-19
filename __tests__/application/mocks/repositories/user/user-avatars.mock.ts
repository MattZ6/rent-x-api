import {
  ICreateUserAvatarRepository,
  IFindUserAvatarByIdRepository,
  IUpdateUserAvatarRepository,
} from '@application/protocols/repositories/user/avatar';

import { makeUserAvatarMock } from '../../../../domain/entities';

export class FindUserAvatarByIdRepositorySpy
  implements IFindUserAvatarByIdRepository
{
  async findById(
    data: IFindUserAvatarByIdRepository.Input
  ): Promise<IFindUserAvatarByIdRepository.Output> {
    const { id } = data;

    const userAvatarMock = makeUserAvatarMock();

    Object.assign(userAvatarMock, { id });

    return userAvatarMock;
  }
}

export class UpdateUserAvatarRepositorySpy
  implements IUpdateUserAvatarRepository
{
  async update(
    data: IUpdateUserAvatarRepository.Input
  ): Promise<IUpdateUserAvatarRepository.Output> {
    const { id, extension, mime_type, original_name, size_in_bytes } = data;

    const userAvatarMock = makeUserAvatarMock();

    Object.assign(userAvatarMock, {
      id,
      extension,
      mime_type,
      original_name,
      size_in_bytes,
    });

    return userAvatarMock;
  }
}

export class CreateUserAvatarRepositorySpy
  implements ICreateUserAvatarRepository
{
  async create(
    data: ICreateUserAvatarRepository.Input
  ): Promise<ICreateUserAvatarRepository.Output> {
    const { id, mime_type, size_in_bytes, original_name, extension } = data;

    const userAvatarMock = makeUserAvatarMock();

    Object.assign(userAvatarMock, {
      id,
      mime_type,
      size_in_bytes,
      original_name,
      extension,
    });

    return userAvatarMock;
  }
}
