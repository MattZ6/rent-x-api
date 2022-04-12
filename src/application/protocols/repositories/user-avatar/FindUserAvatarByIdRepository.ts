import { IUserAvatar } from '@domain/models/UserAvatar';

interface IFindUserAvatarByIdRepository {
  findById(
    data: IFindUserAvatarByIdRepository.Input
  ): Promise<IFindUserAvatarByIdRepository.Output>;
}

namespace IFindUserAvatarByIdRepository {
  export type Input = {
    id: string;
  };

  export type Output = IUserAvatar | undefined;
}

export { IFindUserAvatarByIdRepository };
