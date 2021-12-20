import { AppError } from '@domain/errors';
import { IUser } from '@domain/models/User';

export interface IGetUserProfileUseCase {
  execute(
    data: IGetUserProfileUseCase.Data
  ): Promise<IGetUserProfileUseCase.Response>;
}

export namespace IGetUserProfileUseCase {
  export type Data = {
    user_id: string;
  };

  export type Response = IUser | AppError;
}
