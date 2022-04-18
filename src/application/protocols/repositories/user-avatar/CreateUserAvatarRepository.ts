import { IUserAvatar } from '@domain/entities/UserAvatar';

interface ICreateUserAvatarRepository {
  create(
    data: ICreateUserAvatarRepository.Input
  ): Promise<ICreateUserAvatarRepository.Output>;
}

namespace ICreateUserAvatarRepository {
  export type Input = Pick<
    IUserAvatar,
    'id' | 'original_name' | 'extension' | 'mime_type' | 'size_in_bytes'
  >;

  export type Output = IUserAvatar;
}

export { ICreateUserAvatarRepository };
