import { Repository, getRepository } from 'typeorm';

import {
  ICreateUserAvatarRepository,
  IFindUserAvatarByIdRepository,
  IUpdateUserAvatarRepository,
} from '@application/protocols/repositories/user/avatar';

import { UserAvatar } from '../../entities/UserAvatar';

export class PostgresUserAvatarsRepository
  implements
    IFindUserAvatarByIdRepository,
    ICreateUserAvatarRepository,
    IUpdateUserAvatarRepository
{
  private readonly repository: Repository<UserAvatar>;

  constructor() {
    this.repository = getRepository(UserAvatar);
  }

  async findById(
    data: IFindUserAvatarByIdRepository.Input
  ): Promise<IFindUserAvatarByIdRepository.Output> {
    const { id } = data;

    return this.repository.findOne(id);
  }

  async create(
    data: ICreateUserAvatarRepository.Input
  ): Promise<ICreateUserAvatarRepository.Output> {
    const { id, original_name, mime_type, extension, size_in_bytes } = data;

    const userAvatar = this.repository.create({
      id,
      original_name,
      mime_type,
      extension,
      size_in_bytes,
    });

    return this.repository.save(userAvatar);
  }

  async update(
    data: ICreateUserAvatarRepository.Input
  ): Promise<ICreateUserAvatarRepository.Output> {
    return this.repository.save(data);
  }
}
