import { IUserAvatar } from '@domain/models/UserAvatar';

interface IUpdateUserAvatarRepository {
  update(
    data: IUpdateUserAvatarRepository.Input
  ): Promise<IUpdateUserAvatarRepository.Output>;
}

namespace IUpdateUserAvatarRepository {
  export type Input = IUserAvatar;

  export type Output = IUserAvatar;
}

export { IUpdateUserAvatarRepository };
