import { UserAvatar } from '@domain/entities/UserAvatar';

interface IDeleteUserAvatarByUserIdRepository {
  deleteByUserId(
    data: IDeleteUserAvatarByUserIdRepository.Input
  ): Promise<IDeleteUserAvatarByUserIdRepository.Output>;
}

namespace IDeleteUserAvatarByUserIdRepository {
  export type Input = Pick<UserAvatar, 'user_id'>;

  export type Output = void;
}

export { IDeleteUserAvatarByUserIdRepository };
