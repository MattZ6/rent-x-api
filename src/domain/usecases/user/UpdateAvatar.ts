import { UserAvatar } from '@domain/entities/UserAvatar';

interface IUpdateUserAvatarUseCase {
  execute(
    data: IUpdateUserAvatarUseCase.Input
  ): Promise<IUpdateUserAvatarUseCase.Output>;
}

namespace IUpdateUserAvatarUseCase {
  export type UploadedFile = {
    name: string;
    size: number;
    type: string;
    extension: string;
    content: Buffer;
  };

  export type Input = {
    user_id: string;
    file: UploadedFile;
  };

  export type Output = UserAvatar;
}

export { IUpdateUserAvatarUseCase };
