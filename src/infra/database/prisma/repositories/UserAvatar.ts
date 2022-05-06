import {
  ICreateUserAvatarRepository,
  IFindUserAvatarByIdRepository,
  IUpdateUserAvatarRepository,
} from '@application/protocols/repositories/user';

import { prisma } from '..';

export class PrismaUserAvatarsRepository
  implements
    IFindUserAvatarByIdRepository,
    ICreateUserAvatarRepository,
    IUpdateUserAvatarRepository
{
  async findById(
    data: IFindUserAvatarByIdRepository.Input
  ): Promise<IFindUserAvatarByIdRepository.Output> {
    const { user_id } = data;

    const userAvatar = await prisma.userAvatar.findUnique({
      where: { user_id },
    });

    return userAvatar;
  }

  async create(
    data: ICreateUserAvatarRepository.Input
  ): Promise<ICreateUserAvatarRepository.Output> {
    const { user_id, extension, mime_type, original_name, size_in_bytes } =
      data;

    const userAvatar = await prisma.userAvatar.create({
      data: {
        user_id,
        extension,
        mime_type,
        original_name,
        size_in_bytes,
      },
    });

    return userAvatar;
  }

  async update(
    data: IUpdateUserAvatarRepository.Input
  ): Promise<IUpdateUserAvatarRepository.Output> {
    const { user_id, extension, mime_type, original_name, size_in_bytes } =
      data;

    const userAvatar = await prisma.userAvatar.update({
      where: { user_id },
      data: { extension, mime_type, original_name, size_in_bytes },
    });

    return userAvatar;
  }
}
