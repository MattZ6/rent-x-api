import { getRepository, Repository } from 'typeorm';

import {
  ICreateUserTokenRepository,
  IDeleteUserTokenByIdRepository,
  IFindUserTokenByTokenRepository,
} from '@data/protocols/repositories/user-token';

import { UserToken } from '@infra/database/typeorm/entities/UserToken';

export class PostgresUserTokensRepository
  implements
    ICreateUserTokenRepository,
    IFindUserTokenByTokenRepository,
    IDeleteUserTokenByIdRepository
{
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create(
    data: ICreateUserTokenRepository.Input
  ): Promise<ICreateUserTokenRepository.Output> {
    const { token, expires_in, user_id } = data;

    const userToken = this.repository.create({ token, expires_in, user_id });

    return this.repository.save(userToken);
  }

  async findByToken(
    data: IFindUserTokenByTokenRepository.Input
  ): Promise<IFindUserTokenByTokenRepository.Output> {
    const { token } = data;

    return this.repository.findOne({ token });
  }

  async deleteById(
    data: IDeleteUserTokenByIdRepository.Input
  ): Promise<IDeleteUserTokenByIdRepository.Output> {
    const { id } = data;

    await this.repository.delete(id);
  }
}
