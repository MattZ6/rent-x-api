import { IUserToken } from '@domain/models/UserToken';

export interface IFindUserTokenByTokenRepository {
  findByToken(token: string): Promise<IUserToken | undefined>;
}
