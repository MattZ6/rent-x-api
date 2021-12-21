import { IUser } from '@domain/models/User';

export interface IGetUserProfileUseCase {
  execute(
    data: IGetUserProfileUseCase.Input
  ): Promise<IGetUserProfileUseCase.Output>;
}

export namespace IGetUserProfileUseCase {
  export type Input = {
    user_id: string;
  };

  export type Output = IUser;
}
