import { UserAvatar } from '@domain/entities/UserAvatar';

interface IFindUserAvatarByIdRepository {
  findById(
    data: IFindUserAvatarByIdRepository.Input
  ): Promise<IFindUserAvatarByIdRepository.Output>;
}

namespace IFindUserAvatarByIdRepository {
  export type Input = Pick<UserAvatar, 'id'>;

  export type Output = UserAvatar | undefined;
}

export { IFindUserAvatarByIdRepository };
