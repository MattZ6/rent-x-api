import { User } from '@domain/entities/User';

interface IGetUserProfileUseCase {
  execute(
    data: IGetUserProfileUseCase.Input
  ): Promise<IGetUserProfileUseCase.Output>;
}

namespace IGetUserProfileUseCase {
  export type Input = {
    user_id: string;
  };

  export type Output = User;
}

export { IGetUserProfileUseCase };
