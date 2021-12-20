import faker from 'faker';

import { IUser } from '@domain/models/User';

import {
  CreateUserRepositoryData,
  ICreateUserRepository,
} from '@data/protocols/repositories/user';
import { ICheckIfUserExistsByEmailRepository } from '@data/protocols/repositories/user/CheckIfUserExistsByEmailRepository';

export class CheckIfUserExistsByEmailRepositorySpy
  implements ICheckIfUserExistsByEmailRepository
{
  async checkIfExistsByEmail(_: string): Promise<boolean> {
    return false;
  }
}

export class CreateUserRepositorySpy implements ICreateUserRepository {
  async create(data: CreateUserRepositoryData): Promise<IUser> {
    const { name, email, password_hash, driver_license } = data;

    return {
      id: faker.datatype.uuid(),
      name,
      email,
      password_hash,
      driver_license,
      created_at: faker.datatype.datetime(),
      updated_at: faker.datatype.datetime(),
    };
  }
}
