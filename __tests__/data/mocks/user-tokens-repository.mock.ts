import { IUserToken } from '@domain/models/UserToken';

import {
  CreateUserTokenDTO,
  ICreateUserTokenRepository,
} from '@data/protocols/repositories/user-token';

import { userTokenMock } from '../../domain/models/user-token.mock';

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
