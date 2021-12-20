import { IUserToken } from '@domain/models/UserToken';

export type CreateUserTokenDTO = {
  token: string;
  user_id: string;
  expires_in: Date;
};

export interface ICreateUserTokenRepository {
  create(data: CreateUserTokenDTO): Promise<IUserToken>;
}
