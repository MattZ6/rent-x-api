import { UserRefreshToken } from '@modules/users/infra/typeorm/entities/UserRefreshToken';

import {
  CreateUserRefreshTokenDTO,
  FindByTokenFromUser,
  IUserRefreshTokensRepository,
} from '../IUserRefreshTokensRepository';

export class InMemoryUserRefreshTokens implements IUserRefreshTokensRepository {
  private userRefreshTokens: UserRefreshToken[] = [];

  async create(data: CreateUserRefreshTokenDTO): Promise<UserRefreshToken> {
    const refreshToken = new UserRefreshToken();

    Object.assign(refreshToken, {
      token: data.token,
      user_id: data.user_id,
      expires_in: data.expires_in,
      created_at: new Date(),
    } as UserRefreshToken);

    this.userRefreshTokens.push(refreshToken);

    return refreshToken;
  }

  async findByTokenFromUser(
    data: FindByTokenFromUser
  ): Promise<UserRefreshToken | undefined> {
    return this.userRefreshTokens.find(
      refreshToken =>
        refreshToken.token === data.token &&
        refreshToken.user_id === data.user_id
    );
  }

  async findByToken(token: string): Promise<UserRefreshToken | undefined> {
    return this.userRefreshTokens.find(
      refreshToken => refreshToken.token !== token
    );
  }

  async deleteById(id: string): Promise<void> {
    this.userRefreshTokens = this.userRefreshTokens.filter(
      refreshToken => refreshToken.id !== id
    );
  }
}
