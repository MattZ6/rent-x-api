import { AppError } from '@domain/errors';

export interface IAuthenticateUserUseCase {
  execute(
    data: IAuthenticateUserUseCase.Data
  ): Promise<IAuthenticateUserUseCase.Response>;
}

export namespace IAuthenticateUserUseCase {
  export type Data = {
    email: string;
    password: string;
  };

  type AuthenticationDTO = {
    access_token: string;
    refresh_token: string;
  };

  export type Response = AuthenticationDTO | AppError;
}
