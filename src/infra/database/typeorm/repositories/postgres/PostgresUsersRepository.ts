import { getRepository, Raw, Repository } from 'typeorm';

import { IUser } from '@domain/models/User';

import {
  CreateUserRepositoryData,
  ICheckIfUserExistsByEmailRepository,
  ICreateUserRepository,
  IFindUserByIdRepository,
} from '@data/protocols/repositories/user';

import { User } from '../../entities/User';

export class PostgresUsersRepository
  implements
    ICheckIfUserExistsByEmailRepository,
    ICreateUserRepository,
    IFindUserByIdRepository
{
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async checkIfExistsByEmail(email: string): Promise<boolean> {
    const count = await this.repository.count({
      where: {
        email: Raw(field => `LOWER(${field}) = LOWER(:value)`, {
          value: email,
        }),
      },
    });

    return count >= 1;
  }

  async create(data: CreateUserRepositoryData): Promise<IUser> {
    const { name, driver_license, email, password_hash } = data;

    const user = this.repository.create({
      name,
      driver_license,
      email,
      password_hash,
    });

    return this.repository.save(user);
  }

  async findById(id: string): Promise<IUser | undefined> {
    return this.repository.findOne(id);
  }
}
