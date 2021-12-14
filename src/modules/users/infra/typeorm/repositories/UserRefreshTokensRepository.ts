import { getRepository, Repository } from 'typeorm';

import {
  CreateUserRefreshTokenDTO,
  FindByTokenFromUser,
  IUserRefreshTokensRepository,
} from '@modules/users/repositories/IUserRefreshTokensRepository';

import { UserRefreshToken } from '../entities/UserRefreshToken';

export class UserRefreshTokensRepository
  implements IUserRefreshTokensRepository
{
  private repository: Repository<UserRefreshToken>;

  constructor() {
    this.repository = getRepository(UserRefreshToken);
  }

  async findByTokenFromUser(
    data: FindByTokenFromUser
  ): Promise<UserRefreshToken> {
    const { user_id, token } = data;

    return this.repository.findOne({
      where: {
        token,
        user_id,
      },
    });
  }

  async create(data: CreateUserRefreshTokenDTO): Promise<UserRefreshToken> {
    const { user_id, token, expires_in } = data;

    const userRefreshToken = this.repository.create({
      user_id,
      token,
      expires_in,
    });

    return this.repository.save(userRefreshToken);
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
