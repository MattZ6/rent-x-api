import { UserAvatar } from '@domain/entities/UserAvatar';

interface IUpdateUserAvatarRepository {
  update(
    data: IUpdateUserAvatarRepository.Input
  ): Promise<IUpdateUserAvatarRepository.Output>;
}

namespace IUpdateUserAvatarRepository {
  export type Input = Pick<UserAvatar, 'id'> &
    Pick<
      Partial<UserAvatar>,
      'extension' | 'mime_type' | 'original_name' | 'size_in_bytes'
    >;

  export type Output = UserAvatar;
}

export { IUpdateUserAvatarRepository };
