import { IUser } from '@domain/entities/User';

interface IGetUserProfileUseCase {
  execute(
    data: IGetUserProfileUseCase.Input
  ): Promise<IGetUserProfileUseCase.Output>;
}

namespace IGetUserProfileUseCase {
  export type Input = {
    user_id: string;
  };

  export type Output = IUser;
}

export { IGetUserProfileUseCase };
