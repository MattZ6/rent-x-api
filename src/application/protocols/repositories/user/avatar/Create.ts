import { UserAvatar } from '@domain/entities/UserAvatar';

interface ICreateUserAvatarRepository {
  create(
    data: ICreateUserAvatarRepository.Input
  ): Promise<ICreateUserAvatarRepository.Output>;
}

namespace ICreateUserAvatarRepository {
  export type Input = Pick<
    UserAvatar,
    'id' | 'original_name' | 'extension' | 'mime_type' | 'size_in_bytes'
  >;

  export type Output = UserAvatar;
}

export { ICreateUserAvatarRepository };
