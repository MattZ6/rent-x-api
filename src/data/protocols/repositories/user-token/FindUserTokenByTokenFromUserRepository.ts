import { IUserToken } from '@domain/models/UserToken';

export type FindUserTokenByTokenFromUser = {
  token: string;
  user_id: string;
};

export interface IFindUserTokenByTokenFromUserRepository {
  findByTokenFromUser(
    data: FindUserTokenByTokenFromUser
  ): Promise<IUserToken | undefined>;
}
