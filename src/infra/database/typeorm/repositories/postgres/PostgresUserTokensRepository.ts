import { getRepository, Repository } from 'typeorm';

import { IUserToken } from '@domain/models/UserToken';

import {
  CreateUserTokenDTO,
  ICreateUserTokenRepository,
} from '@data/protocols/repositories/user-token';

import { UserToken } from '@infra/database/typeorm/entities/UserToken';

export class PostgresUserTokensRepository
  implements ICreateUserTokenRepository
{
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create(data: CreateUserTokenDTO): Promise<IUserToken> {
    const { token, expires_in, user_id } = data;

    const userToken = this.repository.create({ token, expires_in, user_id });

    return this.repository.save(userToken);
  }
}
