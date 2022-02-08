import {
  ICreateUserTokenRepository,
  IDeleteUserTokenByIdRepository,
} from '@data/protocols/repositories/user-token';
import { IFindUserTokenByTokenRepository } from '@data/protocols/repositories/user-token/FindUserTokenByTokenRepository';

import { userTokenMock } from '../../../domain/models/user-token.mock';

export class CreateUserTokenRepositorySpy
  implements ICreateUserTokenRepository
{
  async create(
    data: ICreateUserTokenRepository.Input
  ): Promise<ICreateUserTokenRepository.Output> {
    const { token, expires_in, user_id } = data;

    const userToken = { ...userTokenMock };

    Object.assign(userToken, { token, expires_in, user_id });

    return userToken;
  }
}

export class DeleteUserTokenByIdRepositorySpy
  implements IDeleteUserTokenByIdRepository
{
  async deleteById(
    _: IDeleteUserTokenByIdRepository.Input
  ): Promise<IDeleteUserTokenByIdRepository.Output> {
    // That's all folks 🐰
  }
}

export class FindUserTokenByTokenRepositorySpy
  implements IFindUserTokenByTokenRepository
{
  async findByToken(
    data: IFindUserTokenByTokenRepository.Input
  ): Promise<IFindUserTokenByTokenRepository.Output> {
    const { token } = data;

    const userToken = { ...userTokenMock };

    Object.assign(userToken, { token });

    return userToken;
  }
}
