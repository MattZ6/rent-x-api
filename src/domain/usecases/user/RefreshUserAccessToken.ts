import { AppError } from '@domain/errors';

export interface IRefreshUserAccessTokenUseCase {
  execute(
    data: IRefreshUserAccessTokenUseCase.Data
  ): Promise<IRefreshUserAccessTokenUseCase.Response>;
}

export namespace IRefreshUserAccessTokenUseCase {
  export type Data = {
    user_id: string;
    refresh_token: string;
  };

  type Authentication = {
    access_token: string;
    refresh_token: string;
  };

  export type Response = Authentication | AppError;
}
