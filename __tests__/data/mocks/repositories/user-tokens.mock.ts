import { IUserToken } from '@domain/models/UserToken';

import {
  CreateUserTokenDTO,
  FindUserTokenByTokenFromUser,
  ICreateUserTokenRepository,
  IDeleteUserTokenByIdRepository,
  IFindUserTokenByTokenFromUserRepository,
} from '@data/protocols/repositories/user-token';
import { IFindUserTokenByTokenRepository } from '@data/protocols/repositories/user-token/FindUserTokenByTokenRepository';

import { userTokenMock } from '../../../domain/models/user-token.mock';

export class CreateUserTokenRepositorySpy
  implements ICreateUserTokenRepository
{
  async create(data: CreateUserTokenDTO): Promise<IUserToken> {
    const { token, expires_in, user_id } = data;

    const userToken = { ...userTokenMock };

    Object.assign(userToken, { token, expires_in, user_id });

    return userToken;
  }
}

export class FindUserTokenByTokenFromUserRepositorySpy
  implements IFindUserTokenByTokenFromUserRepository
{
  async findByTokenFromUser(
    data: FindUserTokenByTokenFromUser
  ): Promise<IUserToken> {
    const { token, user_id } = data;

    const userToken = { ...userTokenMock };

    Object.assign(userToken, { token, user_id });

    return userToken;
  }
}

export class DeleteUserTokenByIdRepositorySpy
  implements IDeleteUserTokenByIdRepository
{
  async deleteById(_: string): Promise<void> {
    // That's all folks 🐰
  }
}

export class FindUserTokenByTokenRepositorySpy
  implements IFindUserTokenByTokenRepository
{
  async findByToken(token: string): Promise<IUserToken | undefined> {
    const userToken = { ...userTokenMock };

    Object.assign(userToken, { token });

    return userToken;
  }
}
