import { getRepository, Raw, Repository } from 'typeorm';

import {
  ICheckIfUserExistsByEmailRepository,
  ICheckIfUserExistsByIdRepository,
  ICreateUserRepository,
  IFindUserByEmailRepository,
  IFindUserByIdRepository,
  IUpdateUserRepository,
} from '@data/protocols/repositories/user';

import { User } from '../../entities/User';

export class PostgresUsersRepository
  implements
    ICheckIfUserExistsByEmailRepository,
    ICreateUserRepository,
    IFindUserByIdRepository,
    IFindUserByEmailRepository,
    IUpdateUserRepository,
    ICheckIfUserExistsByIdRepository
{
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async checkIfExistsByEmail(
    data: ICheckIfUserExistsByEmailRepository.Input
  ): Promise<ICheckIfUserExistsByEmailRepository.Output> {
    const { email } = data;

    const count = await this.repository.count({
      where: {
        email: Raw(field => `LOWER(${field}) = LOWER(:value)`, {
          value: email,
        }),
      },
    });

    return count >= 1;
  }

  async create(
    data: ICreateUserRepository.Input
  ): Promise<ICreateUserRepository.Output> {
    const { name, driver_license, email, password_hash } = data;

    const user = this.repository.create({
      name,
      driver_license,
      email,
      password_hash,
    });

    return this.repository.save(user);
  }

  async findById(
    data: IFindUserByIdRepository.Input
  ): Promise<IFindUserByIdRepository.Output> {
    const { id } = data;

    return this.repository.findOne(id);
  }

  async findByEmail(
    data: IFindUserByEmailRepository.Input
  ): Promise<IFindUserByEmailRepository.Output> {
    const { email } = data;

    return this.repository.findOne({
      where: {
        email: Raw(field => `LOWER(${field}) = LOWER(:value)`, {
          value: email,
        }),
      },
    });
  }

  async update(
    data: IUpdateUserRepository.Input
  ): Promise<IUpdateUserRepository.Output> {
    return this.repository.save(data);
  }

  async checkIfExistsById(
    data: ICheckIfUserExistsByIdRepository.Input
  ): Promise<ICheckIfUserExistsByIdRepository.Output> {
    const { id } = data;

    const count = await this.repository.count({
      where: { id },
    });

    return count >= 1;
  }
}
