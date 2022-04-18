import { IUserAvatar } from '@domain/entities/UserAvatar';

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
