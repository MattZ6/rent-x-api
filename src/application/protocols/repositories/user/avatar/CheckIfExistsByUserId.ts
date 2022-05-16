import { UserAvatar } from '@domain/entities/UserAvatar';

interface ICheckIfUserAvatarExistsByUserIdRepository {
  checkIfExistsByUserId(
    data: ICheckIfUserAvatarExistsByUserIdRepository.Input
  ): Promise<ICheckIfUserAvatarExistsByUserIdRepository.Output>;
}

namespace ICheckIfUserAvatarExistsByUserIdRepository {
  export type Input = Pick<UserAvatar, 'user_id'>;

  export type Output = boolean;
}

export { ICheckIfUserAvatarExistsByUserIdRepository };
