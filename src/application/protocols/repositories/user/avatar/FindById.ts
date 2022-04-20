import { UserAvatar } from '@domain/entities/UserAvatar';

interface IFindUserAvatarByIdRepository {
  findById(
    data: IFindUserAvatarByIdRepository.Input
  ): Promise<IFindUserAvatarByIdRepository.Output>;
}

namespace IFindUserAvatarByIdRepository {
  export type Input = Pick<UserAvatar, 'user_id'>;

  export type Output = UserAvatar | undefined;
}

export { IFindUserAvatarByIdRepository };
