import { AppError } from '@domain/errors';

export type AuthenticateUserDTO = {
  email: string;
  password: string;
};

export type Authentication = {
  access_token: string;
  refresh_token: string;
};

export type AuthenticateUserResponseDTO = Authentication | AppError;

export interface IAuthenticateUserUseCase {
  execute(data: AuthenticateUserDTO): Promise<AuthenticateUserResponseDTO>;
}
